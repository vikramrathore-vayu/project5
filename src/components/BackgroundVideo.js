"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const handlePlay = () => {
    // Smoothly fade in over 0.5s
    setOpacity(1);
  };

  const handleEnded = () => {
    // 1. Fade out opacity to 0 (takes 0.5s based on transition-opacity duration-500)
    setOpacity(0);

    // 2. Wait for the 500ms fade-out transition to complete + 100ms delay = 600ms, then replay
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.warn("Video playback replay interrupted:", err);
        });
      }
    }, 600);
  };

  useEffect(() => {
    // Attempt auto-play on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video autoplay blocked by browser policy, waiting for user interaction:", err);
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        style={{ opacity: opacity }}
        onPlay={handlePlay}
        onEnded={handleEnded}
      />
    </div>
  );
}
