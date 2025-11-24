'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaRocket, FaShieldAlt, FaBolt, FaArrowRight, FaCodeBranch, FaGlobe } from 'react-icons/fa'
import { BiNetworkChart, BiTrendingUp } from 'react-icons/bi'
import { useRef } from 'react'

// --- COMPONENTS ---

// 1. Background Noise & Grid
const BackgroundFX = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[#020202]" />
    
    {/* Noise Texture */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />

    {/* Perspective Grid */}
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, transparent 90%)',
        transform: 'perspective(500px) rotateX(60deg) scale(2)',
        transformOrigin: 'top center'
      }}
    />

    {/* Ambient Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-[#39FF14]/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#39FF14]/5 blur-[150px] rounded-full" />
  </div>
)

// 2. Data Bento Card
const BentoCard = ({ title, value, sub, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="group relative overflow-hidden bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#39FF14]/30 transition-all duration-300"
  >
    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/0 to-[#39FF14]/0 group-hover:from-[#39FF14]/5 group-hover:to-transparent transition-all duration-500" />
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-white/5 text-[#888] group-hover:text-[#39FF14] group-hover:bg-[#39FF14]/10 transition-colors">
          <Icon size={18} />
        </div>
        <span className="text-[10px] font-mono text-[#444] group-hover:text-[#39FF14] uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
          Live
        </span>
      </div>
      
      <div>
        <h4 className="text-[#666] text-xs uppercase tracking-wider font-medium mb-1">{title}</h4>
        <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight group-hover:text-[#f0f0f0]">
          {value}
        </div>
        {sub && <p className="text-[#39FF14] text-xs mt-1 font-mono">{sub}</p>}
      </div>
    </div>
  </motion.div>
)

// 3. Infinite Scroll Ticker
const InfiniteTicker = () => (
  <div className="absolute bottom-0 w-full bg-[#050505] border-t border-white/5 py-3 overflow-hidden z-20">
    <div className="flex whitespace-nowrap">
      <motion.div 
        className="flex gap-12 px-6"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            {['BTC/USD $64,230', 'ETH/USD $3,450', 'SOL/USD $145', 'APT/USD $12.4', 'BNB/USD $590'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                {item} <span className="text-[#39FF14]">+1.2%</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
)

// --- MAIN HERO COMPONENT ---

const HeroSection = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-24 overflow-hidden"
    >
      <BackgroundFX />

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          
          {/* 1. Header Content */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#39FF14]">
                Protocol V2 is Live
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-6"
            >
              Institutional Grade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                Margin Trading
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto leading-relaxed font-light mb-10"
            >
              Lend, borrow, and trade with up to <span className="text-white font-medium">50x leverage</span> via 
              a fully on-chain order book. The liquidity of CEX, the security of DeFi.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="group relative w-full sm:w-auto px-8 py-4 bg-[#39FF14] text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Launch App <FaRocket />
                </span>
              </button>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                Read Documentation 
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[#39FF14]" />
              </button>
            </motion.div>
          </div>

          {/* 2. The "Command Center" Grid (Replaces Image) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <BentoCard 
              title="Total Value Locked" 
              value="$489.5M" 
              sub="+12.4% (24h)"
              icon={FaGlobe} 
              delay={0.4} 
            />
            <BentoCard 
              title="Execution Speed" 
              value="< 400ms" 
              sub="Sub-second Finality"
              icon={FaBolt} 
              delay={0.5} 
            />
            <BentoCard 
              title="Protocol Security" 
              value="Audited" 
              sub="100% On-Chain Logic"
              icon={FaShieldAlt} 
              delay={0.6} 
            />
             {/* Wide Card */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.7 }}
               className="md:col-span-2 lg:col-span-1 group relative overflow-hidden bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#39FF14]/30 transition-all duration-300"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-white/5 text-[#888] group-hover:text-[#39FF14] transition-colors"><BiNetworkChart size={18} /></div>
                </div>
                <h4 className="text-[#666] text-xs uppercase tracking-wider font-medium mb-1">AI Sentiment</h4>
                <div className="flex items-end gap-3">
                    <div className="text-2xl font-bold text-white">Bullish</div>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: '85%' }} 
                            transition={{ duration: 1, delay: 1 }} 
                            className="h-full bg-[#39FF14]" 
                        />
                    </div>
                </div>
                <p className="text-[#39FF14] text-xs mt-1 font-mono">85/100 Confidence</p>
            </motion.div>
          </div>

          {/* 3. Tech Stack Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
          >
             {['Aptos', 'Sui', 'Ethereum', 'Polygon'].map((tech, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-white">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14]" /> {tech}
                </div>
             ))}
          </motion.div>

        </div>
      </motion.div>

      <InfiniteTicker />
    </section>
  )
}

export default HeroSection