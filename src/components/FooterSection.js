'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { 
  PiTelegramLogoDuotone, 
  PiXLogoBold, 
  PiArrowUpRightBold,
  PiPaperPlaneRightFill,
  PiLightningFill
} from 'react-icons/pi'
import { SiBinance } from "react-icons/si";
import Image from 'next/image'

const Footer = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 0])

  const links = [
    { title: "Platform", items: [
      { label: "Web Agent Terminal", href: "/ai" },
      { label: "Live Tokenomics", href: "#tokenomics" },
      { label: "System Roadmap", href: "#roadmap" },
      { label: "Governance", href: "#" }
    ]},
    { title: "Resources", items: [
      { label: "Whitepaper v2.0", href: "#" },
      { label: "API Documentation", href: "#" },
      { label: "Security Audits", href: "#" },
      { label: "Brand Assets", href: "#" }
    ]}
  ]

  const socials = [
    { icon: PiTelegramLogoDuotone, href: "https://t.me/worldlibertyai", label: "Telegram" },
    { icon: PiXLogoBold, href: "https://x.com/worldlibertyai", label: "X / Twitter" },
    { icon: SiBinance, href: "https://bscscan.com", label: "BscScan" }
  ]

  return (
    <footer 
      ref={containerRef}
      className="relative bg-[#050505] overflow-hidden pt-20"
    >
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Massive Background Typography */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none select-none overflow-hidden flex justify-center items-end opacity-[0.03]"
      >
        <h1 className="text-[18vw] leading-[0.75] font-bold text-white tracking-tighter whitespace-nowrap">
          WORLD LIBERTY
        </h1>
      </motion.div>


      {/* --- Infinite Marquee Ticker --- */}
      <div className="w-full border-y border-white/5 bg-[#0A0A0A] py-3 overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap">
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 text-xs font-mono uppercase tracking-[0.2em] text-[#666]">
                <span>System Status: <span className="text-[#39FF14]">Online</span></span>
                <span className="w-1.5 h-1.5 bg-white/20 rotate-45" />
                <span>Next Block: <span className="text-white">Loading...</span></span>
                <span className="w-1.5 h-1.5 bg-white/20 rotate-45" />
                <span>AI Consensus: <span className="text-[#39FF14]">Active</span></span>
                <span className="w-1.5 h-1.5 bg-white/20 rotate-45" />
                <span>Gas: <span className="text-white">12 Gwei</span></span>
                <span className="w-1.5 h-1.5 bg-white/20 rotate-45" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* --- Main Content --- */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 {/* Replace with your Image Logo if needed */}
                 <div className="w-10 h-10 bg-[#39FF14] rounded-lg flex items-center justify-center text-black font-bold text-xl">
                   W
                 </div>
                 <span className="text-2xl font-medium text-white tracking-tight">World Liberty AI</span>
              </div>
              <p className="text-[#888] text-lg leading-relaxed max-w-md">
                Decentralized intelligence for the modern era. 
                We provide the tools; you build the future.
              </p>
            </div>

            {/* Terminal Input */}
            <div className="space-y-4">
               <h4 className="text-sm font-mono uppercase tracking-widest text-white/40">Initialize Uplink</h4>
               <form className="relative group">
                 <input 
                   type="email" 
                   placeholder="Enter email address..." 
                   className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-[#444] outline-none focus:border-[#39FF14]/50 transition-colors font-mono text-sm"
                 />
                 <button className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-black rounded-lg flex items-center justify-center hover:bg-[#39FF14] transition-colors">
                    <PiPaperPlaneRightFill />
                 </button>
               </form>
               <p className="text-xs text-[#444]">
                 By subscribing, you agree to receive encrypted transmission updates.
               </p>
            </div>
          </div>


          {/* Right: Navigation & Socials */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-16 md:gap-24 pt-4 lg:pt-0 justify-end">
            
            {links.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-medium mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.items.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="group flex items-center gap-2 text-[#888] hover:text-[#39FF14] transition-colors text-sm">
                        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#39FF14]"></span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Socials Column */}
            <div>
              <h4 className="text-white font-medium mb-6">Network</h4>
              <div className="flex gap-4">
                {socials.map((social, i) => (
                  <MagneticSocial key={i}>
                    <a 
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-white hover:bg-[#39FF14] hover:text-black hover:border-[#39FF14] transition-all duration-300"
                    >
                      <social.icon size={20} />
                    </a>
                  </MagneticSocial>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* --- Footer Bottom --- */}
      <div className="relative z-10 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="text-xs text-[#444] font-mono">
            COPYRIGHT © 2025 WORLD LIBERTY AI.
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#39FF14]/5 border border-[#39FF14]/10">
               <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
               <span className="text-[10px] text-[#39FF14] font-mono uppercase tracking-widest">
                 All Systems Operational
               </span>
             </div>
          </div>

        </div>
      </div>

    </footer>
  )
}

// --- SUB-COMPONENT: MAGNETIC SOCIAL BUTTON ---
const MagneticSocial = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.5);
    y.set((clientY - centerY) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: useSpring(x), y: useSpring(y) }}
    >
      {children}
    </motion.div>
  );
};

export default Footer