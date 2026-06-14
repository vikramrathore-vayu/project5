"use client";

export default function MarqueeFooter() {
  const items = [
    { text: "Forever Bond", emoji: "🤝" },
    { text: "Best Friends", emoji: "💖" },
    { text: "True Love", emoji: "✨" },
    { text: "Sorry & Love", emoji: "🥺" },
    { text: "Forgiven", emoji: "🌸" }
  ];

  // Double the list for seamless infinite loop wrapping
  const listItems = [...items, ...items];

  return (
    <footer className="w-full overflow-hidden py-8 z-10 select-none relative mt-auto">
      {/* Left/Right fading overlays */}
      <div 
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" 
        style={{ background: "linear-gradient(to right, hsl(260, 87%, 3%) 0%, transparent 100%)" }}
      ></div>
      <div 
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" 
        style={{ background: "linear-gradient(to left, hsl(260, 87%, 3%) 0%, transparent 100%)" }}
      ></div>
      
      {/* Moving tape container */}
      <div className="flex whitespace-nowrap animate-marquee">
        {listItems.map((item, index) => (
          <div
            key={index}
            className="liquid-glass mx-4 px-8 py-3.5 inline-flex items-center gap-3 text-white font-medium text-sm"
            style={{ borderRadius: "50px" }}
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="font-serif uppercase tracking-widest font-bold text-xs text-purple-100/90">{item.text}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
