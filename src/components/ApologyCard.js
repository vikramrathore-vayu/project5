"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ApologyCard({ friendName, onAccept }) {
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  const warningMessages = [
    "Please soch lo! 🥺",
    "Ek aur chance do! 🙏",
    "Galti sabhi se hoti hai... 😿",
    "Hum best friends hain na? ❤️",
    "Chalo maan bhi jao... ✨",
    "Wicky is really sorry! 🙏"
  ];

  const handleNahi = () => {
    // 1. Trigger shake by incrementing state key
    setShakeTrigger((prev) => prev + 1);

    // 2. Show cycling warning message toast
    const nextMsg = warningMessages[shakeTrigger % warningMessages.length];
    setToastMessage(nextMsg);
  };

  const handleYes = () => {
    // 1. Trigger Confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#fcd34d", "#f43f5e"]
    });

    // Fire fireworks loop
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 40 * (timeLeft / duration);
      confetti({ 
        ...defaults, 
        particleCount, 
        colors: ["#6366f1", "#a855f7", "#fcd34d", "#f43f5e"],
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        colors: ["#6366f1", "#a855f7", "#fcd34d", "#f43f5e"],
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      });
    }, 200);

    // 2. Wait 2 seconds before transitioning to Screen 3
    setTimeout(() => {
      onAccept();
    }, 2000);
  };

  return (
    <motion.div
      key={`apology-card-${shakeTrigger}`}
      initial={shakeTrigger === 0 ? { opacity: 0, y: 30 } : {}}
      animate={shakeTrigger > 0 ? { x: [-10, 10, -10, 10, -5, 5, 0] } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="liquid-glass w-full max-w-md p-8 text-center relative mx-4 border border-white/5 z-10"
    >
      {/* Pulse Sad Emoji */}
      <div className="text-6xl mb-6 select-none animate-emoji-pulse inline-block">
        🥺
      </div>

      {/* Heading */}
      <h2 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3 tracking-wide select-none">
        Mujhe maaf kar diya kya?
      </h2>

      {/* Subtitle */}
      <p className="font-sans text-sm text-purple-200/80 leading-relaxed mb-8 select-none">
        I know I was wrong, and I'm really sorry. Please click "Yes" to forgive me.
      </p>

      {/* Button Row */}
      <div className="flex justify-center items-center gap-6 min-h-[60px] relative">
        <button
          onClick={handleYes}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 hover:opacity-95 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide select-none"
        >
          Yes, Maaf Kiya! ❤️
        </button>

        <button
          onClick={handleNahi}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-6 rounded-full transition-all cursor-pointer text-sm select-none"
        >
          Nahi 🥺
        </button>
      </div>

      {/* Shake Error / Warning Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-pink-500/15 border border-pink-500/25 rounded-full py-2 px-6 text-xs font-semibold text-pink-300 tracking-wide inline-flex items-center gap-1.5 shadow-md shadow-pink-500/5 select-none"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
