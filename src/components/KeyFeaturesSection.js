'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { FaBrain, FaChartLine, FaEye, FaTelegram } from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { PiCaretRightBold } from "react-icons/pi";

const KeyFeaturesSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const features = [
    {
      icon: FaBrain,
      title: "AI Transaction Engine",
      description: "Track WLFI & flows in real-time with advanced pattern recognition. Spot unusual trades instantly.",
      highlight: "Real-time"
    },
    {
      icon: FaChartLine,
      title: "Market Intelligence",
      description: "AI-generated insights on volatility patterns, liquidity trends, and cross-exchange arbitrage.",
      highlight: "Analytics"
    },
    {
      icon: FaEye,
      title: "Whale Monitor",
      description: "Stay ahead of major market movements by tracking whale wallets and institutional flows.",
      highlight: "Detection"
    },
    {
      icon: FaTelegram,
      title: "Telegram Mini App",
      description: "Access powerful AI insights directly in Telegram. No downloads, just instant intelligence.",
      highlight: "Integrated"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-10 sm:py-32 overflow-hidden bg-[#050505]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#39FF14] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">System Capabilities</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6 leading-[1.1]"
          >
            Powerful Tools for <br />
            <span className="text-white/40">Modern Markets.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#888] font-light leading-relaxed"
          >
            Unprecedented insight into financial data driven by our proprietary AI core.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href='https://x.com/worldlibertyai' 
            target='_blank' 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] border border-white/10 rounded-full overflow-hidden hover:border-[#39FF14]/50 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-[#39FF14]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BsTwitterX className="text-white group-hover:text-[#39FF14] transition-colors" />
            <span className="text-sm font-medium text-white tracking-wide uppercase group-hover:text-[#39FF14] transition-colors">
              Follow Updates
            </span>
            <PiCaretRightBold className="text-[#666] group-hover:translate-x-1 group-hover:text-[#39FF14] transition-all" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}

const FeatureCard = ({ feature, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
      className="group relative p-8 h-full bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:bg-[#0E0E0E] hover:border-[#39FF14]/20 transition-all duration-500"
    >
      {/* Top Badge */}
      <div className="flex justify-between items-start mb-10">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-[#39FF14] group-hover:text-black transition-all duration-300">
          <feature.icon size={20} className="text-[#39FF14] group-hover:text-black transition-colors" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/20 border border-white/10 px-2 py-1 rounded bg-black/20 group-hover:text-[#39FF14] group-hover:border-[#39FF14]/30 transition-colors">
          {feature.highlight}
        </span>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#39FF14] transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#999] transition-colors">
          {feature.description}
        </p>
      </div>
      
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

export default KeyFeaturesSection