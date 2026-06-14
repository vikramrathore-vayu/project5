"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Onboarding({ onStart }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required to start the journey 🥺");
      return;
    }
    setError("");
    onStart(name.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen flex flex-col justify-between items-center py-6 px-4 z-10"
    >
      {/* Simplified Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-white/5 select-none">
        <div className="font-serif font-bold text-xl tracking-wider text-white">
          Best Friend <span className="text-gradient">Buddy</span>
        </div>
        <div className="text-pink-500 text-xl animate-pulse">❤️</div>
      </nav>

      {/* Main Hero & Name Input Container */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl w-full py-12">
        {/* Headline */}
        <h1 className="font-serif font-bold text-[56px] md:text-[100px] leading-[1.02] tracking-tight text-white mb-4 select-none">
          Best Friend
          <span className="text-gradient block md:inline"> Buddy</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg md:text-xl text-purple-200/80 font-medium tracking-wide mb-12 select-none">
          An Unbreakable Bond
        </p>

        {/* Form Input Card */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center gap-6">
          <div className="w-full flex flex-col items-center">
            <label className="text-xs font-semibold uppercase tracking-widest text-purple-300/60 mb-3 select-none">
              Enter Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Your Name"
              className="liquid-glass w-full max-w-sm px-6 py-4 text-white text-center font-medium placeholder-white/30 border border-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-lg"
            />
            {error && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-rose-400 text-xs mt-3 block font-semibold"
              >
                {error}
              </motion.span>
            )}
          </div>

          <button
            type="submit"
            className="bg-white text-black hover:bg-white/90 font-bold px-[29px] py-[20px] rounded-full shadow-xl shadow-white/5 hover:shadow-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wider uppercase font-sans select-none"
          >
            Start Journey ➔
          </button>
        </form>
      </div>

      {/* Footer Buffer Spacer to align center */}
      <div className="h-10"></div>
    </motion.div>
  );
}
