'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate, 
  animate,
  useMotionValueEvent 
} from 'framer-motion';
import { 
  PiRocketLaunchDuotone, 
  PiArrowRight, 
  PiChartLineUpBold, 
  PiLockKeyDuotone, 
  PiGlobeHemisphereWestDuotone, 
  PiLightningDuotone,
  PiCaretDownBold
} from 'react-icons/pi';
import Lenis from 'lenis';

// --- UTILITY: COUNTING NUMBER ---
const Counter = ({ from, to, prefix = '', suffix = '', decimals = 0 }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2.5,
      delay: 0.5,
      ease: [0.25, 1, 0.5, 1], // Soft expo out
      onUpdate(value) {
        node.textContent = `${prefix}${value.toLocaleString(undefined, { 
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals 
        })}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [from, to, prefix, suffix, decimals]);

  return <span ref={nodeRef} />;
};

// --- COMPONENT: MAGNETIC BUTTON ---
// A micro-interaction wrapper that pulls the button toward the cursor
const MagneticWrapper = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate distance from center and apply strength
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Spring physics for smooth return
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

// --- MAIN COMPONENT: HERO SECTION ---
const HeroSection = () => {
  const containerRef = useRef(null);

  // 1. Initialize Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // 2. Parallax & Scroll Transforms
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleContent = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // 3. Mouse Spotlight for Grid
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(
    500px circle at ${mouseX}px ${mouseY}px,
    rgba(57, 255, 20, 0.08),
    transparent 80%
  )`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] selection:bg-[#39FF14] selection:text-black"
    >
      
      {/* =========================================
          BACKGROUND LAYERS
      ========================================= */}
      
      {/* 1. Grain Texture (Adds cinematic feel) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 2. Architectural Grid with Mouse Spotlight */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBackground }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Spotlight Overlay */}
        <motion.div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: spotlightBg }}
        />
      </motion.div>

      {/* 3. Top Glow */}
      <div className="absolute top-[-20%] left-0 right-0 h-[500px] bg-[#39FF14] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />


      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <motion.div 
        className="relative z-30 container mx-auto px-6 flex flex-col items-center text-center pt-20"
        style={{ opacity: opacityContent, scale: scaleContent }}
      >
        
        {/* --- Badge --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-white/80">
              Live on Mainnet
            </span>
          </div>
        </motion.div>

        {/* --- Headline (Masked Animation) --- */}
        <div className="mb-6 max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter text-white leading-[0.95]"
            >
              Liquidity.
            </motion.h1>
          </div>
          <div className="overflow-hidden flex justify-center gap-2 md:gap-6 flex-wrap">
             <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter text-[#555] leading-[0.95]"
            >
              Without
            </motion.h1>
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter text-white leading-[0.95]"
            >
              Limits.
            </motion.h1>
          </div>
        </div>

        {/* --- Subtext --- */}
        <motion.p 
          className="max-w-xl mx-auto text-base sm:text-lg text-white/60 font-light leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Institutional-grade trading for everyone. The first decentralized 
          exchange with <span className="text-[#39FF14]">zero latency</span> and deep liquidity.
        </motion.p>

        {/* --- Buttons (Magnetic) --- */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MagneticWrapper>
            <a href="#" className="relative group block">
              <div className="absolute inset-0 bg-[#39FF14] rounded-full blur-[10px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <button className="relative px-8 py-4 bg-white text-black rounded-full overflow-hidden flex items-center gap-2 transition-transform active:scale-95">
                <span className="font-bold tracking-tight text-sm uppercase">Launch Terminal</span>
                <PiRocketLaunchDuotone className="text-black group-hover:rotate-45 transition-transform duration-300" size={18} />
              </button>
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.2}>
            <a href="#" className="px-8 py-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors flex items-center gap-2 group">
              <span className="font-medium tracking-tight text-sm uppercase">Read Docs</span>
              <PiArrowRight className="text-white/50 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* --- Stats HUD --- */}
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1000px' }}
        >
          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-1 shadow-2xl overflow-hidden">
            
            {/* HUD Top Shine */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
              
              <StatCard 
                label="Total Volume"
                value={<Counter from={0} to={842} prefix="$" suffix="M" decimals={0} />}
                trend="+12%"
                icon={PiChartLineUpBold}
              />
              <StatCard 
                label="Trades / Sec"
                value={<Counter from={0} to={12500} />}
                sub="Lightning Fast"
                icon={PiLightningDuotone}
                highlight
              />
              <StatCard 
                label="Total Locked"
                value={<Counter from={0} to={245} prefix="$" suffix="M" />}
                trend="+4.5%"
                icon={PiLockKeyDuotone}
              />
              <StatCard 
                label="Active Wallets"
                value={<Counter from={0} to={89} suffix="K" />}
                sub="Global"
                icon={PiGlobeHemisphereWestDuotone}
              />

            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="mt-16 text-white/20 flex flex-col items-center gap-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
            <PiCaretDownBold />
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
};

// --- SUB-COMPONENT: STAT CARD ---
const StatCard = ({ label, value, trend, sub, icon: Icon, highlight = false }) => {
  return (
    <div className="relative bg-[#050505] p-6 group hover:bg-[#080808] transition-colors duration-500">
      {/* Scanning Line Effect on Hover */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity h-full shadow-[0_0_10px_#39FF14]" />
      
      <div className="flex items-center justify-between mb-4">
        <Icon className={`text-xl ${highlight ? 'text-[#39FF14]' : 'text-white/40 group-hover:text-white transition-colors'}`} />
        {(trend || sub) && (
          <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-white/30 bg-white/5'}`}>
            {trend || sub}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className={`text-3xl font-medium tracking-tight ${highlight ? 'text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.3)]' : 'text-white'}`}>
          {value}
        </div>
        <div className="text-xs text-white/40 uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;