"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SongSelector({ onSongFinished }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");
  
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  const songs = [
    { id: 1, title: "Khat by Navjot Ahuja", tag: "Emotional", file: "/songs/song1.mp3" },
    { id: 2, title: "Dooran Doran", tag: "Romantic", file: "/songs/song2.mp3" },
    { id: 3, title: "Arz Kiya Hai", tag: "Soft", file: "/songs/song3.mp3" }
  ];

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setIsPlaying(true);

    // CRITICAL: Set 30 seconds fallback timer
    timeoutRef.current = setTimeout(() => {
      console.log("30-second fallback triggered.");
      handleSongEnd();
    }, 30000);
  };

  const handleSongEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSongFinished();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 30; // fallback if duration is NaN
      setProgress((current / duration) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDurationTime(formatTime(audioRef.current.duration));
    }
  };

  const handleAudioError = (e) => {
    console.warn("Local MP3 not found. Loading royalty-free web fallback...");
    const audio = e.currentTarget;
    
    // Web Fallbacks for instant out-of-the-box working preview
    const webFallbacks = {
      1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      2: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    };

    if (selectedSong && webFallbacks[selectedSong.id]) {
      audio.src = webFallbacks[selectedSong.id];
      audio.load();
      audio.play().catch(err => console.log("Replay failed:", err));
    }
  };

  useEffect(() => {
    // Play immediately when selected
    if (selectedSong && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.warn("Playback blocked by browser auto-play policy:", err);
      });
    }
  }, [selectedSong]);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {!selectedSong ? (
        <div className="w-full flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-purple-300/70 mb-2">
            🎵 Choose a Song for Us
          </h4>
          
          <div className="grid grid-cols-1 gap-4 w-full">
            {songs.map((song) => (
              <motion.button
                key={song.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSong(song)}
                className="liquid-glass text-left p-5 flex items-center justify-between border border-white/5 cursor-pointer hover:bg-white/[0.03] transition-all group"
              >
                <div>
                  <h5 className="font-serif font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                    {song.title}
                  </h5>
                  <p className="text-xs text-purple-200/50 uppercase tracking-widest mt-1">
                    {song.tag}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all text-white">
                  ▶
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="liquid-glass w-full p-6 border border-white/5 flex flex-col items-center text-center">
                  <audio
            ref={audioRef}
            src={selectedSong.file}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleSongEnd}
            onError={handleAudioError}
          />
          
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-300 mb-4 select-none">
            Now Playing
          </div>
          
          <h4 className="font-serif font-bold text-white text-xl mb-1 select-none">
            {selectedSong.title}
          </h4>
          <p className="text-xs text-purple-200/60 tracking-wider mb-6 select-none">
            Playing our special theme melody...
          </p>

          {/* Animated Visualizer Waves */}
          <div className="flex items-end justify-center gap-1.5 h-14 mb-6 select-none">
            <div className="w-1.5 bg-indigo-400 rounded-t-full animate-bar-1"></div>
            <div className="w-1.5 bg-purple-500 rounded-t-full animate-bar-2"></div>
            <div className="w-1.5 bg-amber-400 rounded-t-full animate-bar-3"></div>
            <div className="w-1.5 bg-pink-500 rounded-t-full animate-bar-4"></div>
            <div className="w-1.5 bg-indigo-400 rounded-t-full animate-bar-2"></div>
          </div>

          {/* Custom Progress Bar */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-purple-200/50 font-semibold tracking-wider select-none">
              <span>{currentTime}</span>
              <span>{durationTime}</span>
            </div>
          </div>

          {/* Quick Skip Option */}
          <button
            onClick={handleSongEnd}
            className="mt-6 text-[10px] font-bold uppercase tracking-wider text-purple-200/50 hover:text-white transition-colors cursor-pointer select-none"
          >
            Skip Song & See Letter ➔
          </button>
        </div>
      )}
    </div>
  );
}
