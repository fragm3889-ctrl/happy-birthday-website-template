"use client";

import { useState } from "react";
import { playPurr } from "@/utils/audio";
import FloatingElement from "./FloatingElement";
import { Heart } from "lucide-react";

export default function InteractiveCat() {
  const [isPurring, setIsPurring] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePet = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPurring) return; // Don't interrupt an active purr
    
    setIsPurring(true);
    playPurr();
    
    // Create a little floating heart at the click position relative to the cat
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 20; // center offset
    const y = e.clientY - rect.top - 20;

    const newHeart = { id: Date.now(), x, y };
    setHearts(prev => [...prev.slice(-4), newHeart]); // Keep max 5 hearts on screen

    // Reset purr state after sound finishes (2.5s)
    setTimeout(() => {
      setIsPurring(false);
    }, 2500);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <FloatingElement yOffset={5} duration={3}>
        <div 
          onClick={handlePet}
          className={`relative cursor-pointer transition-transform duration-300 ${isPurring ? 'scale-110' : 'hover:scale-105'} select-none`}
        >
          {/* Subtle shake animation when purring */}
          <span 
            className={`text-7xl md:text-8xl drop-shadow-xl inline-block ${isPurring ? 'animate-pulse' : ''}`}
            role="img" 
            aria-label="Pettable Cat"
            title="Pet me!"
          >
            {isPurring ? "😸" : "😺"}
          </span>
          
          {/* Floating Hearts */}
          {hearts.map(heart => (
            <div 
              key={heart.id} 
              className="absolute pointer-events-none animate-float-up text-pink-500"
              style={{ left: heart.x, top: heart.y }}
            >
              <Heart className="w-6 h-6 fill-current animate-pulse opacity-80" />
            </div>
          ))}
        </div>
      </FloatingElement>

      {/* Prompts */}
      <div className="mt-4 flex flex-col items-center min-h-[40px]">
         {!isPurring ? (
           <span className="text-sm font-sans italic text-foreground/60 transition-opacity animate-pulse">
             Pet the cat!
           </span>
         ) : (
           <span className="text-sm font-sans italic text-primary-500 font-medium transition-opacity animate-bounce">
             *purrrrr*
           </span>
         )}
      </div>
    </div>
  );
}
