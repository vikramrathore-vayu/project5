"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SongSelector from "./SongSelector";

export default function ShayariCard({ friendName, onSongFinished }) {
  const [shayariCount, setShayariCount] = useState(1);
  const [showSongSelector, setShowSongSelector] = useState(false);

  // Custom love shayaris with dynamic friendName substitution
  const shayarisList = [
    {
      shayari: `Puri duniya ek taraf aur mera dil ek taraf,\nIs dil me sabse upar bas aapka naam hai, ${friendName}.`,
      translation: `The whole world is on one side, and my heart is on the other. In this heart, your name is above all, ${friendName}.`
    },
    {
      shayari: `Log puchte hain meri muskurahat ka raaz,\nMain has kar bas ${friendName} keh deta hoon.`,
      translation: `People ask the secret behind my smile, I just laugh and say ${friendName}.`
    },
    {
      shayari: `Zindagi jeene ke liye toh bas saansein chahiye,\nPar khush rehne ke liye bas ek ${friendName} chahiye.`,
      translation: `To live life, only breaths are needed, but to remain happy, just one ${friendName} is needed.`
    }
  ];

  const current = shayarisList[shayariCount - 1];

  const handleNext = () => {
    if (shayariCount < 3) {
      setShayariCount((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="liquid-glass w-full max-w-lg p-8 border border-white/5 mx-4"
    >
      {!showSongSelector ? (
        <>
          <div className="flex justify-between items-center mb-6 select-none">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300/60 font-sans">
              Shayari Step {shayariCount} of 3
            </span>
            <span className="text-xl">📜</span>
          </div>

          <h3 className="text-3xl font-bold font-serif text-gradient mb-6 select-none">
            Dosti Ki Shayari
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={shayariCount}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="min-h-[220px] flex flex-col justify-center py-4 text-center"
            >
              <p className="font-serif text-white font-semibold text-xl sm:text-2xl leading-relaxed italic whitespace-pre-line mb-6 tracking-wide select-text">
                {current.shayari}
              </p>
              
              <div className="border-t border-white/5 pt-4 mt-4 max-w-sm mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1 select-none">
                  Translation
                </span>
                <p className="font-sans text-xs text-purple-200/60 leading-relaxed italic select-text">
                  "{current.translation}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-white/5 pt-6 mt-6 flex justify-center">
            {shayariCount < 3 ? (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 hover:opacity-95 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all text-xs cursor-pointer uppercase tracking-wider select-none font-sans"
              >
                Agli Shayari ➔
              </button>
            ) : (
              <button
                onClick={() => setShowSongSelector(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35 transition-all text-xs cursor-pointer uppercase tracking-wider select-none font-sans flex items-center gap-1.5"
              >
                🎵 Choose a Song for Us
              </button>
            )}
          </div>
        </>
      ) : (
        <SongSelector onSongFinished={onSongFinished} />
      )}
    </motion.div>
  );
}
