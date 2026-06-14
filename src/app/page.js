"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Onboarding from "@/components/Onboarding";
import ApologyCard from "@/components/ApologyCard";
import ShayariCard from "@/components/ShayariCard";
import ThankYouPage from "@/components/ThankYouPage";
import BackgroundVideo from "@/components/BackgroundVideo";
import MarqueeFooter from "@/components/MarqueeFooter";

export default function Home() {
  const [friendName, setFriendName] = useState("");
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleStartOnboarding = (name) => {
    setFriendName(name);
    setStep(2);
  };

  const handleAcceptApology = () => {
    setStep(3);
  };

  const handleSongFinished = () => {
    // Auto transition to Screen 4 (Thank You)
    setStep(4);
  };

  return (
    <main 
      className="min-h-screen w-full flex flex-col justify-between items-center relative overflow-hidden font-sans"
      style={{
        backgroundColor: "rgb(6, 1, 16)" // Fallback matching HSL 260 87% 3%
      }}
    >
      {/* Background JS-controlled Fade Looping Video */}
      <BackgroundVideo />

      {/* Centered Blurred Overlay Shape */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] opacity-90 bg-gray-950/80 rounded-full blur-[82px] pointer-events-none z-0 overflow-visible"
      ></div>

      {/* Screen 1: Hero & Name Input */}
      {step === 1 && (
        <Onboarding onStart={handleStartOnboarding} />
      )}

      {/* Screens 2, 3 & 4: Standard Page Wrapper with Logo Header */}
      {step > 1 && (
        <div className="z-10 w-full flex-1 flex flex-col justify-between items-center py-6 px-4">
          {/* Navbar */}
          <nav className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-white/5 select-none">
            <div className="font-serif font-bold text-xl tracking-wider text-white">
              Best Friend <span className="text-gradient">Buddy</span>
            </div>
            <div className="text-pink-500 text-xl animate-pulse">❤️</div>
          </nav>

          {/* Cards Switcher */}
          <div className="flex-1 flex justify-center items-center py-12 w-full">
            <AnimatePresence mode="wait">
              {step === 2 && (
                <div key="step-apology" className="w-full flex justify-center">
                  <ApologyCard friendName={friendName} onAccept={handleAcceptApology} />
                </div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step-celebration"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-6 w-full max-w-lg"
                >
                  {/* Celebration Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="liquid-glass w-full p-6 text-center border border-white/5 select-none"
                  >
                    <h2 className="font-serif font-bold text-2xl md:text-3xl text-white">
                      Yay! Thank you, <span className="text-gradient font-bold">{friendName}</span>! 🎉
                    </h2>
                  </motion.div>

                  {/* Shayari Card & Song Selector Sequence */}
                  <ShayariCard friendName={friendName} onSongFinished={handleSongFinished} />
                </motion.div>
              )}

              {step === 4 && (
                <div key="step-thankyou" className="w-full flex justify-center">
                  <ThankYouPage friendName={friendName} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Infinite Scrolling Marquee Footer */}
      <MarqueeFooter />
    </main>
  );
}
