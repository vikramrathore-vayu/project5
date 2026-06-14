"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SongSelector from "./SongSelector";

export default function ShayariCard({ friendName, onSongFinished }) {
  const [shayari, setShayari] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [shayariCount, setShayariCount] = useState(1);
  const [showSongSelector, setShowSongSelector] = useState(false);

  const fetchShayari = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/shayari", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendName }),
      });

      const data = await response.json();

      if (response.ok) {
        setShayari(data.shayari);
        setTranslation(data.translation);
      } else {
        setError(data.error || "Failed to generate Shayari. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please check if your dev server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShayari();
  }, [friendName, shayariCount]);

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
            {loading ? (
              <motion.div
                key="shimmer-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 min-h-[220px]"
              >
                <div className="w-full max-w-[280px] flex flex-col gap-3">
                  <div className="h-4 w-full bg-white/5 rounded-md animate-pulse"></div>
                  <div className="h-4 w-[85%] bg-white/5 rounded-md animate-pulse self-center"></div>
                  <div className="h-4 w-[90%] bg-white/5 rounded-md animate-pulse self-center"></div>
                  <div className="h-3 w-[50%] bg-white/5 rounded-md animate-pulse self-center mt-6"></div>
                </div>
                
                <p className="text-xs font-medium tracking-wide text-purple-200/50 mt-6 select-none">
                  Writing Shayari {shayariCount} for {friendName}... ✍️
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 min-h-[220px] flex flex-col items-center justify-center text-center"
              >
                <div className="text-3xl mb-3 select-none">⚠️</div>
                <p className="text-sm font-semibold text-rose-300 mb-6 max-w-xs">{error}</p>
                <button
                  onClick={fetchShayari}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-2.5 px-6 rounded-full text-xs transition-all cursor-pointer"
                >
                  Retry Connection 🔄
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="shayari-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="min-h-[220px] flex flex-col justify-center py-4 text-center"
              >
                <p className="font-serif text-white font-semibold text-xl sm:text-2xl leading-relaxed italic whitespace-pre-line mb-6 tracking-wide select-text">
                  {shayari}
                </p>
                
                <div className="border-t border-white/5 pt-4 mt-4 max-w-sm mx-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1 select-none">
                    Translation
                  </span>
                  <p className="font-sans text-xs text-purple-200/60 leading-relaxed italic select-text">
                    "{translation}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-t border-white/5 pt-6 mt-6 flex justify-center">
            {shayariCount < 3 ? (
              <button
                onClick={handleNext}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 hover:opacity-95 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider select-none font-sans"
              >
                Agli Shayari ➔
              </button>
            ) : (
              <button
                onClick={() => setShowSongSelector(true)}
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35 transition-all text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider select-none font-sans flex items-center gap-1.5"
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
