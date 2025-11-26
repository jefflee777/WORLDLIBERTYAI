'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import { PiRocketLaunchDuotone, PiArrowRight, PiChartLineUpBold, PiLockKeyDuotone, PiGlobeHemisphereWestDuotone, PiCpuDuotone, PiLightningDuotone } from 'react-icons/pi';
import Lenis from 'lenis';

// --- UTILITY: COUNTING NUMBER HOOK ---
const Counter = ({ from, to, prefix = '', suffix = '', delay = 0 }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Wait for delay then animate
    const controls = animate(from, to, {
      duration: 2.5,
      delay: delay,
      ease: [0.16, 1, 0.3, 1], // Expo out for "snap" feel
      onUpdate(value) {
        node.textContent = `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [from, to, prefix, suffix, delay]);

  return <span ref={nodeRef} />;
};

// --- COMPONENT: HERO SECTION ---
const HeroSection = () => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // 1. Setup Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // 2. Mouse Spotlight Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const backgroundGradient = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(57, 255, 20, 0.06),
    transparent 80%
  )`;

  // 3. Parallax Transforms
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothY = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });
  
  const yContent = useTransform(smoothY, [0, 1], [0, -50]);
  const opacityContent = useTransform(smoothY, [0, 0.5], [1, 0]);
  const scaleHUD = useTransform(smoothY, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] selection:bg-[#39FF14] selection:text-black"
    >
      
      {/* =========================================================
          BACKGROUND LAYER (Grid + Spotlight)
      ========================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic Spotlight */}
        <motion.div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: backgroundGradient }}
        />
        
        {/* Architectural Grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-[#39FF14] opacity-[0.08] blur-[120px] rounded-full" />
      </div>

      {/* =========================================================
          CONTENT LAYER
      ========================================================= */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center"
        style={{ y: yContent, opacity: opacityContent }}
      >
        
        {/* --- 1. System Badge --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 group cursor-default"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-[#39FF14]/30 hover:bg-[#39FF14]/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#888] group-hover:text-[#39FF14] transition-colors">
              Mainnet Online
            </span>
          </div>
        </motion.div>

        {/* --- 2. Cinematic Headline --- */}
        <div className="mb-8 max-w-5xl mx-auto overflow-hidden">
          <motion.h1 
            className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The Architecture of 
            <span className="text-transparent  sm:pl-4 pl-2 bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
              On-Chain Alpha
            </span>
          </motion.h1>
        </div>

        {/* --- 3. Refined Subtext --- */}
        <motion.p 
          className="max-w-xl mx-auto text-sm sm:text-lg text-balance text-[#888] font-light leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Execute institutional-grade trades with <span className="text-[#39FF14]">zero latency</span>. 
          The first decentralized order book powered by predictive liquidity engines.
        </motion.p>

        {/* --- 4. CTA Buttons --- */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-6 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#" className="relative group">
            <div className="absolute inset-0 bg-[#39FF14] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <button className="relative px-8 py-4 bg-[#0F0F0F] text-white rounded-full leading-none overflow-hidden border border-[#39FF14]/20 hover:border-[#39FF14]/50 transition-all shadow-xl flex items-center gap-3">
              <span className="font-semibold tracking-wide">Launch App</span>
              <PiRocketLaunchDuotone className="text-[#39FF14] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </a>

          <a href="#" className="group flex items-center gap-2 text-[#666] hover:text-white transition-colors text-sm font-medium tracking-wide">
            View Documentation
            <PiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* --- 5. The "System HUD" (Replaces Image) --- */}
        <motion.div 
          className="w-full max-w-5xl mx-auto perspective-1000"
          style={{ scale: scaleHUD }}
          initial={{ opacity: 0, rotateX: 20, y: 50 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glass Panel */}
          <div className="relative rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-2xl overflow-hidden shadow-2xl">
            
            {/* Top Scanning Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent opacity-50">
              <motion.div 
                className="absolute inset-0 bg-[#39FF14] blur-[2px]" 
                animate={{ x: ['-100%', '100%'] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              
              <HUDItem 
                icon={PiLockKeyDuotone} 
                label="TVL" 
                value={<Counter from={0} to={489542639} prefix="$" />} 
                trend="+12.4%"
              />
              
              <HUDItem 
                icon={PiChartLineUpBold} 
                label="24h Volume" 
                value={<Counter from={0} to={124000000} prefix="$" />} 
                trend="+5.2%"
              />
              
              <HUDItem 
                icon={PiGlobeHemisphereWestDuotone} 
                label="Active Users" 
                value={<Counter from={0} to={89240} />} 
                sub="Global"
              />
              
              <HUDItem 
                icon={PiLightningDuotone} 
                label="Latency" 
                value="< 400ms" 
                sub="Real-time"
                highlight
              />

            </div>
          </div>
          
          {/* Reflection / Floor Glow */}
          <div className="absolute -bottom-10 left-10 right-10 h-10 bg-[#39FF14] blur-[80px] opacity-10 rounded-full" />
        </motion.div>

      </motion.div>

    </section>
  );
};

// --- SUB-COMPONENT: HUD ITEM ---
const HUDItem = ({ icon: Icon, label, value, trend, sub, highlight }) => (
  <div className="relative group p-8 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors cursor-default">
    {/* Hover Glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2 text-[#555] group-hover:text-[#888] transition-colors text-xs font-mono uppercase tracking-widest">
        <Icon className={highlight ? "text-[#39FF14]" : ""} size={16} />
        {label}
      </div>
      {(trend || sub) && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
          trend 
            ? "bg-[#39FF14]/10 text-[#39FF14]" 
            : "bg-white/5 text-[#666]"
        }`}>
          {trend || sub}
        </span>
      )}
    </div>
    
    <div className={`text-2xl md:text-3xl font-light tracking-tight ${highlight ? "text-[#39FF14]" : "text-white"}`}>
      {value}
    </div>
  </div>
);

export default HeroSection;