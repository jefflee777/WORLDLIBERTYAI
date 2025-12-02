'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { 
  PiGlobeHemisphereWestDuotone, 
  PiCheckCircleFill, 
  PiCircleDashedBold, 
  PiLockKeyDuotone, 
  PiCpuDuotone, 
  PiLightningDuotone
} from 'react-icons/pi'
import { BsBarChartLine } from "react-icons/bs";

const RoadmapSection = () => {
  const containerRef = useRef(null)
  
  // Track scroll for the "Laser Beam" path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 50%"]
  })

  // Smooth out the beam drawing
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  })

  const phases = [
    {
      id: "01",
      title: "Foundation",
      status: "completed", 
      timeframe: "Q1 - Q2 2024",
      icon: PiCpuDuotone,
      focus: "Infrastructure",
      specs: [
        "AI Engine Core Development v1.0",
        "WLFI & USD1 Data Integration",
        "Telegram Mini-App Beta Launch",
        "Smart Contract Security Audit"
      ],
      color: "#39FF14"
    },
    {
      id: "02",
      title: "Expansion",
      status: "processing",
      timeframe: "Q3 - Q4 2024",
      icon: BsBarChartLine,
      focus: "Intelligence",
      specs: [
        "Multi-Asset Analysis (ETH, SOL, BTC)",
        "Automated Whale Tracking Bot",
        "Exchange API Partnerships (CEX)",
        "Real-time Sentiment Analysis Engine"
      ],
      color: "#00E0FF"
    },
    {
      id: "03",
      title: "Ecosystem",
      status: "upcoming",
      timeframe: "2025 & Beyond",
      icon: PiGlobeHemisphereWestDuotone,
      focus: "Global Scale",
      specs: [
        "Decentralized Validator Nodes",
        "Cross-Chain Liquidity Bridge",
        "Institutional API Access",
        "Global DAO Governance Launch"
      ],
      color: "#B3FF66"
    }
  ]

  return (
    <section 
      id='roadmap'
      ref={containerRef}
      className="relative py-10 sm:py-32 bg-[#050505] overflow-hidden"
    >
      {/* --- Background Noise & Ambience --- */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39FF14] opacity-[0.02] blur-[200px] rounded-full pointer-events-none" />


      <div className="relative z-10 container mx-auto px-6">
        
        {/* --- Header --- */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm"
          >
             <PiLightningDuotone className="text-[#39FF14]" />
             <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">System Roadmap</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.1]"
          >
            Executing the <br/><span className="text-white/40">Master Plan.</span>
          </motion.h2>
        </div>


        {/* --- The "Snake" Beam Timeline --- */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* SVG PATH BEAM 
              Note: This path is hardcoded to weave through center. 
              On mobile, we hide this and just show a vertical line.
          */}
          <div className="absolute top-0 bottom-0 left-0 right-0 hidden md:block pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 1000 1200" preserveAspectRatio="none">
               {/* 1. The faint track path */}
               <path 
                 d="M 500 0 V 100 Q 500 200 750 250 T 500 450 Q 250 550 250 650 T 500 850 V 1200"
                 fill="none"
                 stroke="rgba(255,255,255,0.05)"
                 strokeWidth="2"
               />
               
               {/* 2. The Active Laser Beam */}
               <motion.path 
                 d="M 500 0 V 100 Q 500 200 750 250 T 500 450 Q 250 550 250 650 T 500 850 V 1200"
                 fill="none"
                 stroke="#39FF14"
                 strokeWidth="2"
                 style={{ pathLength }}
                 strokeLinecap="round"
                 filter="drop-shadow(0 0 8px rgba(57,255,20,0.5))"
               />
             </svg>
          </div>
          
          {/* Mobile Vertical Line */}
          <div className="absolute hidden left-[28px] top-0 bottom-0 w-px bg-white/10 md:hidden" />


          {/* --- Phase Cards --- */}
          <div className="space-y-16 md:space-y-32 relative z-10">
            {phases.map((phase, index) => (
               <PhaseCard key={phase.id} data={phase} index={index} />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

// --- SUB-COMPONENT: PHASE CARD ---
const PhaseCard = ({ data, index }) => {
  
  // Adjusted layout logic:
  const isRight = index % 2 === 0; // Alternating

  // Status Colors & Icons
  const isCompleted = data.status === 'completed';
  const isProcessing = data.status === 'processing';
  const statusColor = isCompleted ? '#39FF14' : isProcessing ? '#00E0FF' : '#444';
  const StatusIcon = isCompleted ? PiCheckCircleFill : isProcessing ? PiCircleDashedBold : PiLockKeyDuotone;

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 ${!isRight ? 'md:flex-row-reverse' : ''}`}>
      
      {/* 1. Date/Info Side */}
      <div className={`w-full md:w-1/2 flex flex-col ${!isRight ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} text-left pl-16 md:pl-0`}>
        <motion.div 
          initial={{ opacity: 0, x: isRight ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2 justify-start md:justify-end" style={{ flexDirection: !isRight ? 'row' : 'row-reverse' }}>
             <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/60 uppercase tracking-widest border border-white/5">
               {data.timeframe}
             </span>
             <span className="h-px w-8 bg-white/10" />
          </div>
          <h3 className="text-4xl font-mono font-bold text-white opacity-20">{data.id}</h3>
        </motion.div>
      </div>


      {/* 2. The Node (Connection Point) */}
      <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center">
         <div 
           className={`w-1.5 h-1.5 rounded-full transition-colors duration-500`}
           style={{ backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}` }} 
         />
      </div>


      {/* 3. The Main Card */}
      <div className="w-full md:w-1/2  md:pl-0">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className={`relative group ${!isRight ? 'md:pr-12' : 'md:pl-12'}`}
        >
          {/* Card Container */}
          <div className="relative overflow-hidden bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-[#39FF14]/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(57,255,20,0.05)]">
            
            {/* Status Badge */}
            <div className="absolute top-0 right-0 px-4 py-2 bg-white/5 border-l border-b border-white/5 rounded-bl-2xl">
               <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: statusColor }}>
                 <StatusIcon className={`${isProcessing ? 'animate-spin' : ''}`} />
                 {data.status}
               </div>
            </div>

            {/* Header */}
            <div className="flex items-start gap-5 mb-8">
               <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <data.icon size={26} className="text-white group-hover:text-[#39FF14] transition-colors" />
               </div>
               <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest sm:mb-1 mb-0 mt-2 sm:mt-0">Focus: {data.focus}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#39FF14] transition-colors">{data.title}</h3>
               </div>
            </div>

            {/* Specs Grid */}
            <div className="grid gap-3">
              {data.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-3 group/item">
                  <div className={`w-1 h-1 rounded-full bg-[#333] group-hover/item:bg-[#39FF14] transition-colors`} />
                  <span className="text-sm text-[#888] group-hover/item:text-[#CCC] transition-colors">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Animated Scan Line (Micro interaction) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default RoadmapSection