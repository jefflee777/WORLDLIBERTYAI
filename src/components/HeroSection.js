'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaRocket, FaGlobeAmericas, FaChartLine, FaLock } from 'react-icons/fa'
import { useRef } from 'react'
import Image from 'next/image'

// Premium Glass Card Component
const StatCard = ({ label, value, icon: Icon, position, delay }) => (
  <motion.div
    className={`absolute ${position} hidden lg:flex items-center gap-4 px-6 py-4 rounded-2xl border border-[#39FF14]/20 bg-[#0a0a0a]/80 backdrop-blur-md z-20`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    animate={{
      y: [0, -10, 0],
    }}
    style={{
      boxShadow: '0 0 30px rgba(57, 255, 20, 0.05), inset 0 0 20px rgba(57, 255, 20, 0.02)'
    }}
  >
    <div className="p-3 rounded-full bg-[#39FF14]/10 text-[#39FF14]">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[#888] text-xs font-medium tracking-wider uppercase">{label}</p>
      <p className="text-white text-lg font-bold tracking-tight">{value}</p>
    </div>
  </motion.div>
)

const HeroSection = () => {
  const containerRef = useRef(null)
  
  // Smooth Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef, 
    offset: ["start start", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 })

  const yText = useTransform(smoothProgress, [0, 1], [0, 100])
  const opacityText = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const scaleImage = useTransform(smoothProgress, [0, 1], [1, 1.1])
  const yImage = useTransform(smoothProgress, [0, 1], [0, -50])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 bg-[#030303]">
        {/* Central Glow (Spotlight effect like reference) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Technical Grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#39FF14] rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          
          {/* --- TEXT CONTENT (Centered like Aries Markets) --- */}
          <motion.div 
            className="max-w-4xl mx-auto space-y-8 z-20"
            style={{ y: yText, opacity: opacityText }}
          >
            {/* H1 Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#39FF14] to-[#39FF14]/50 drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                Financial Liberty
              </span>
            </h1>

            {/* Subtext */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#888] font-light leading-relaxed">
              A decentralized intelligence protocol on the AI Ecosystem. Analyze, track, and trade via a fully on-chain order book with lightning speed.
            </p>

            {/* CTA Button (Centered) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href='https://t.me/WLFIai_bot/live' 
                target='_blank' 
                className="inline-flex group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14] to-[#28cc0f] rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <button className="relative px-10 py-5 bg-[#0a0a0a] text-white rounded-full leading-none overflow-hidden border border-[#39FF14]/50 shadow-[0_0_30px_rgba(57,255,20,0.15)] flex items-center gap-3">
                  <span className="font-semibold text-lg tracking-wide">Launch App</span>
                  <FaRocket className="text-[#39FF14] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                </button>
              </a>
            </motion.div>
          </motion.div>

          {/* --- CENTRAL VISUAL (3D Element with Floating Cards) --- */}
          <motion.div 
            className="relative mt-20 w-full max-w-5xl mx-auto flex justify-center items-center perspective-1000"
            style={{ scale: scaleImage, y: yImage }}
          >
            {/* Background Aura for Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39FF14] opacity-[0.08] blur-[100px] rounded-full" />

            {/* Main 3D Image */}
            <motion.div
              className="relative z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Image 
                src='/heroimage2.png' 
                alt='3D AI Globe' 
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                priority
              />
              
              {/* Spinning Ring Animation (Cosmetic) */}
              <div className="absolute inset-0 rounded-full border border-[#39FF14]/10 scale-125 animate-spin-slow pointer-events-none" />
            </motion.div>

            {/* --- FLOATING STAT CARDS (Matches Reference Image Layout) --- */}
            
            {/* Left Card */}
            <StatCard 
              label="Total Volume" 
              value="$489,542,639" 
              icon={FaChartLine}
              position="left-0 md:left-10 lg:left-0 bottom-20"
              delay={0.6}
            />

            {/* Right Card */}
            <StatCard 
              label="Total Users" 
              value="89,240+" 
              icon={FaGlobeAmericas}
              position="right-0 md:right-10 lg:right-0 bottom-40"
              delay={0.8}
            />
            
            {/* Bottom Center (Mobile Only) */}
            <motion.div 
              className="absolute -bottom-10 flex lg:hidden items-center gap-3 px-5 py-3 rounded-xl border border-[#39FF14]/20 bg-[#0a0a0a]/90 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <FaLock className="text-[#39FF14]" />
              <span className="text-white font-mono text-sm">Audited & Secure</span>
            </motion.div>

          </motion.div>
        </div>
      </div>
      
      {/* Footer Gradient Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent z-10" />
    </section>
  )
}

export default HeroSection