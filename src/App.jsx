import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import pic from "./assets/IMG_2682.png"; // Make sure image exists!

// --- COMPONENT: GLOWING MAGNETIC BUTTON ---
const MagneticButton = ({ isGuarding, onAccept }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 10 });
  const springY = useSpring(y, { stiffness: 120, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isGuarding) {
        // Aggressive Jump to Cursor
        x.set(e.clientX - window.innerWidth / 2 + 100); 
        y.set(e.clientY - window.innerHeight / 2);
      } else {
        // Soft Magnetic Pull
        x.set((e.clientX - window.innerWidth / 2) / 8);
        y.set((e.clientY - window.innerHeight / 2) / 8);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isGuarding, x, y]);

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onClick={onAccept}
      className={`
        relative px-10 py-5 text-lg font-['Plus_Jakarta_Sans'] font-bold rounded-full 
        transition-all duration-300 z-50 tracking-wide uppercase
        ${isGuarding 
          ? 'bg-red-600 text-white shadow-[0_0_50px_rgba(220,38,38,0.8)] scale-110' 
          : 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] hover:scale-105'
        }
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isGuarding ? "😡 Don't Touch No!" : "✨ Yes, Be Mine"}
      </span>
    </motion.button>
  );
};

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isGuardingNo, setIsGuardingNo] = useState(false);

  // Confetti Logic
  const handleAccept = () => {
    setIsAccepted(true);
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
            startVelocity: 30, spread: 360, ticks: 60, particleCount: 50,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#ff007f', '#ffffff', '#a855f7']
        });
    }, 250);
  };

  // --- SUCCESS SCREEN ---
  if (isAccepted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.2),_rgba(0,0,0,1))]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            Forever Us.
          </h1>
          
          {/* Polaroid Frame */}
          <div className="bg-white p-4 pb-16 shadow-[0_0_60px_rgba(236,72,153,0.5)] transform rotate-[-3deg] max-w-sm mx-auto rounded-sm hover:rotate-0 transition-transform duration-500 cursor-pointer">
            <img src={pic} alt="Us" className="w-full grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="mt-4 font-['Playfair_Display'] text-black text-xl italic opacity-80">
                Since: 19th January 2024 ❤️
            </div>
          </div>
          
          <p className="text-white/60 mt-10 font-['Plus_Jakarta_Sans'] tracking-[0.3em] text-sm uppercase">
            Best Decision Ever
          </p>
        </motion.div>
      </div>
    );
  }

  // --- MAIN QUESTION SCREEN ---
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden selection:bg-pink-500 selection:text-white">
      
      {/* 1. Animated Deep Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-glow" />

      {/* 2. Glass Card */}
      <div className="glass-card p-12 md:p-20 rounded-[40px] text-center max-w-3xl w-full mx-4 relative z-10 border-t border-white/10">
        
        {/* Subtle Noise Texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-5 rounded-[40px] pointer-events-none" />

        <h2 className="text-pink-400 font-['Plus_Jakarta_Sans'] font-bold tracking-[0.2em] text-sm uppercase mb-4 animate-pulse">
          Confidential Question
        </h2>

        <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-white mb-12 leading-tight">
          Will you be my <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            Valentine?
          </span>
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16 min-h-[80px]">
          
          {/* YES Button (Magnetic) */}
          <div className="relative z-50">
            <MagneticButton isGuarding={isGuardingNo} onAccept={handleAccept} />
          </div>

          {/* NO Button (The Trap) */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsGuardingNo(true)}
            onMouseLeave={() => setIsGuardingNo(false)}
          >
            <button className="px-10 py-5 text-lg font-['Plus_Jakarta_Sans'] font-medium text-white/40 border border-white/10 rounded-full hover:bg-white/5 transition-all cursor-not-allowed">
              No thanks
            </button>
          </div>

        </div>

        <div className="mt-16 text-white/20 text-xs font-['Plus_Jakarta_Sans']">
          * Terms and conditions apply. Saying no is scientifically impossible.
        </div>

      </div>
    </div>
  );
}

export default App;