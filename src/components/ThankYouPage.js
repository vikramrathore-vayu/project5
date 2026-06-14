"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ThankYouPage({ friendName }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#fcd34d", "#f43f5e"]
    });
  };

  useEffect(() => {
    // Fire a nice celebratory burst on mount
    triggerConfetti();
    
    // Looping soft side confetti rain
    let active = true;
    const frame = () => {
      if (!active) return;
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#6366f1", "#a855f7", "#fcd34d", "#f43f5e"]
      });
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#6366f1", "#a855f7", "#fcd34d", "#f43f5e"]
      });
      requestAnimationFrame(frame);
    };
    frame();

    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="liquid-glass w-full max-w-md p-8 text-center relative border border-white/5 mx-4"
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        onClick={triggerConfetti}
        className="text-7xl mb-6 select-none cursor-pointer inline-block"
      >
        💝
      </motion.div>

      {/* Headline */}
      <h2 className="font-serif font-extrabold text-white text-3xl md:text-4xl mb-4 select-none leading-tight">
        Thank You, <span className="text-gradient font-bold">{friendName}</span>!
      </h2>

      {/* Subtext */}
      <p className="font-sans text-purple-200/80 text-base md:text-lg leading-relaxed mb-8 select-none">
        Your forgiveness means the world to me. Our bond is forever.
      </p>

      {/* Button */}
      <button
        onClick={triggerConfetti}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 hover:opacity-95 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all text-xs cursor-pointer select-none font-sans uppercase tracking-widest"
      >
        Let's Stay Friends Forever, {friendName}! ❤️
      </button>

      <p className="text-purple-300/40 text-[10px] uppercase tracking-wider mt-6 font-semibold select-none">
        Tap the button above to celebrate!
      </p>
    </motion.div>
  );
}
