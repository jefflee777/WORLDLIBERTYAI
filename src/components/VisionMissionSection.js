'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { PiScan, PiTrendUp, PiBellRinging, PiTelegramLogo, PiCaretRight } from 'react-icons/pi';
import Image from 'next/image';

const VisionMissionSection = () => {    
  const containerRef = useRef(null);
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });   
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Data
  const missions = [
    {
      icon: PiScan,
      title: "AI Analysis",
      description: "Real-time algorithmic monitoring of on-chain patterns and whale movements.",
      color: "#39FF14"
    },
    {
      icon: PiTrendUp,
      title: "Predictive Alpha", 
      description: "Data-driven forecasting models to identify market trends before they break.",
      color: "#39FF14"
    },
    {
      icon: PiBellRinging,
      title: "Smart Alerts",
      description: "Instant notification system for abnormal volume and liquidity spikes.",
      color: "#39FF14"
    },
    {
      icon: PiTelegramLogo,
      title: "Mini-App Access",
      description: "Seamless integration directly within Telegram for trading on the go.",
      color: "#2AABEE" // Telegram Blue accent
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-[#050505]"
    >
      {/* --- Background Layers --- */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#39FF14] opacity-[0.02] blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />

      <motion.div 
        className="relative z-10 container mx-auto px-6"
        style={{ opacity: opacityFade }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* --- Left: Image / Visual --- */}
          <motion.div 
            style={{ y: yParallax }}
            className="relative group"
          >
            {/* Image Frame/Border */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
              <div className="absolute inset-0 bg-[#39FF14]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {/* Note: Ensure height/width matches your actual image ratio */}
              <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#111]">
                 {/* Placeholder for your actual image source */}
                 <Image 
                  src='/ourmission.png' 
                  alt='Platform Interface' 
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                />
              </div>

              {/* HUD Overlay Elements */}
              <div className="absolute bottom-6 left-6 z-20">
                <div className="flex items-center gap-2 text-[#39FF14] text-xs font-mono uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#39FF14]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse"/>
                  System Active
                </div>
              </div>
            </div>

            {/* Decorative Elements behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#39FF14] to-transparent opacity-20 blur-xl -z-10 group-hover:opacity-30 transition-opacity" />
          </motion.div>


          {/* --- Right: Vision Text --- */}
          <div className="space-y-8">
            <div className="space-y-2">
              <RevealText className="text-[#39FF14] font-mono text-sm tracking-widest uppercase">
                // The Vision
              </RevealText>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.1]">
                Intelligence <br />
                <span className="text-white/40">Without Borders.</span>
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-lg text-[#888] font-light leading-relaxed max-w-xl"
            >
              <p>
                We believe financial intelligence should be transparent and accessible. 
                WLFI unlocks the hidden patterns of global markets using <span className="text-white">AI and blockchain consensus</span>.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#39FF14] font-medium cursor-pointer group w-fit">
                Explore the Protocol 
                <PiCaretRight className="group-hover:translate-x-1 transition-transform"/>
              </div>
            </motion.div>
          </div>
        </div>


        {/* --- Mission Grid --- */}
        <div className="space-y-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
              <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
                Core Mission
              </h3>
              <p className="text-[#666] max-w-md text-sm leading-relaxed">
                Empowering the next generation of traders with institutional-grade tools
                and real-time decentralized data.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {missions.map((item, i) => (
               <MissionCard key={i} item={item} index={i} />
             ))}
           </div>
        </div>

      </motion.div>
    </section>
  );
};

// --- SUB-COMPONENT: REVEAL TEXT ANIMATION ---
const RevealText = ({ children, className }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  </div>
);

// --- SUB-COMPONENT: MISSION CARD ---
const MissionCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-[#39FF14]/30 transition-colors duration-500 overflow-hidden"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-[#39FF14] group-hover:text-black transition-all duration-300">
          <item.icon size={20} className="text-[#39FF14] group-hover:text-black transition-colors" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h4 className="text-xl font-medium text-white group-hover:text-[#39FF14] transition-colors">
            {item.title}
          </h4>
          <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#999] transition-colors">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default VisionMissionSection;