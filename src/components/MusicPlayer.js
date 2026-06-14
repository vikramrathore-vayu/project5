"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Pentatonic scale frequencies for a harmonious, dreamy melody
  // C4, D4, E4, G4, A4, C5, D5, E5, G5, A5
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  const playAmbientNote = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Pick a random note
    const freq = notes[Math.floor(Math.random() * notes.length)];

    // Oscillator
    const osc = ctx.createOscillator();
    // Use triangle for a softer, warmer, flute-like/bell-like sound
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    // Filter to cut high frequencies and make it even warmer
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);

    // Gain node for ADSR-like envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    // Soft attack
    gain.gain.linearRampToValueAtTime(0.04, now + 1.5);
    // Long decay/release
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 6);

    // Delay/Reverb effect to create space
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.6; // 600ms echo
    
    const feedback = ctx.createGain();
    feedback.gain.value = 0.4; // feedback volume

    // Connect delay loop
    delay.connect(feedback);
    feedback.connect(delay);

    // Connections
    osc.connect(filter);
    filter.connect(gain);
    
    // Connect dry sound to output
    gain.connect(ctx.destination);
    
    // Connect wet sound to delay
    gain.connect(delay);
    delay.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 6);
  };

  const startScheduler = () => {
    // Play immediately
    playAmbientNote();
    // Schedule notes every 3 seconds with a slight random variation
    const scheduleNext = () => {
      const delayTime = 2500 + Math.random() * 2000; // 2.5 to 4.5 seconds
      timerRef.current = setTimeout(() => {
        playAmbientNote();
        scheduleNext();
      }, delayTime);
    };
    scheduleNext();
  };

  const togglePlayback = async () => {
    if (!isPlaying) {
      // Initialize Audio Context on first user click (browser policy)
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      
      setIsPlaying(true);
      startScheduler();
    } else {
      setIsPlaying(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Soft release of context state
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.suspend();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        padding: "8px 16px",
        borderRadius: "30px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onClick={togglePlayback}
    >
      <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#fff", userSelect: "none" }}>
        {isPlaying ? "Ambient Sound Playing" : "Tap for Soft Music 🎵"}
      </span>
      {isPlaying ? (
        <div className="sound-indicator">
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
        </div>
      ) : (
        <div style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          🔇
        </div>
      )}
    </div>
  );
}
