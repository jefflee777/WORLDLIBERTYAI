'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { FaRocket } from 'react-icons/fa'
import { useRef } from 'react'

const HeroSection = () => {
  const globeRef = useRef(null)
  const containerRef = useRef(null)
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Subtle floating animation for the globe
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  // Gentle pulse animation for the rings
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Premium Background Gradient - Top Gold to Black */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top center, rgba(231, 172, 8, 0.15) 0%, transparent 50%),
              linear-gradient(180deg, rgba(231, 172, 8, 0.08) 0%, rgba(28, 25, 23, 1) 30%, rgba(23, 20, 18, 1) 100%)
            `
          }}
        />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(231, 172, 8, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(231, 172, 8, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left space-y-8 lg:space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <motion.span 
                  className="text-[#ffffff] block"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  The Future of
                </motion.span>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] via-[#fdd949] to-[#e7ac08] block"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Financial Liberty,
                </motion.span>
                <motion.span 
                  className="text-[#ffffff] block"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Powered by AI.
                </motion.span>
              </motion.h1>
              
              {/* Elegant Underline */}
              <motion.div 
                className="relative mx-auto lg:mx-0"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              >
                <div className="h-[2px] bg-gradient-to-r from-[#e7ac08] via-[#fdd949] to-transparent rounded-full" />
                <motion.div 
                  className="absolute top-0 left-0 h-[2px] w-6 bg-[#fdd949] rounded-full"
                  animate={{ x: [0, 100, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
              </motion.div>
            </div>

            {/* Subheading */}
            <motion.p 
              className="text-xl sm:text-2xl lg:text-2xl text-[#d7d3d0] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            >
              Real-time insights on global transactions, market trends, and whale movements — 
              all in one intelligent hub.
            </motion.p>

            {/* CTA Button - Keeping Original 3D Style */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              <motion.button
                className="group relative px-8 py-4 sm:px-10 sm:py-5 font-bold text-lg sm:text-xl text-[#171412] rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #e7ac08 0%, #fdd949 100%)',
                  boxShadow: '0 10px 30px rgba(231, 172, 8, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
                  transform: 'perspective(1000px) rotateX(-5deg) rotateY(5deg)',
                }}
                whileHover={{
                  scale: 1.05,
                  rotateX: -2,
                  rotateY: 2,
                  boxShadow: '0 20px 40px rgba(231, 172, 8, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.2)',
                }}
                whileTap={{
                  scale: 0.98,
                  rotateX: -8,
                  rotateY: 8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Button Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                
                <span className="relative flex items-center gap-3">
                  <FaRocket className="text-xl" />
                  Join Beta
                </span>
                
                {/* 3D Edge Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl" 
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Visual - Refined Globe */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Main Globe Container */}
              <motion.div
                ref={globeRef}
                className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]"
                animate={floatingAnimation}
              >
                {/* Outer Ring - Subtle */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#e7ac08]/20"
                  animate={pulseAnimation}
                  style={{
                    boxShadow: '0 0 40px rgba(231, 172, 8, 0.1)',
                  }}
                />
                
                {/* Inner Ring - More Defined */}
                <motion.div
                  className="absolute inset-12 rounded-full border border-[#e7ac08]/40"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                
                {/* Core Globe - Premium Finish */}
                <motion.div
                  className="absolute inset-20 rounded-full"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(253, 217, 73, 0.8) 0%, rgba(231, 172, 8, 0.6) 70%),
                      linear-gradient(135deg, rgba(231, 172, 8, 0.4) 0%, rgba(253, 217, 73, 0.2) 100%)
                    `,
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(231, 172, 8, 0.3)',
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Minimal Data Points */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#fdd949] rounded-full"
                    style={{
                      left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 8)}%`,
                      top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 8)}%`,
                      boxShadow: '0 0 8px rgba(253, 217, 73, 0.6)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Refined Floating Labels */}
              <motion.div
                className="absolute -top-6 -left-6 px-3 py-1.5 bg-[#1c1917]/80 backdrop-blur-sm border border-[#e7ac08]/30 rounded-lg"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut"
                }}
              >
                <span className="text-[#fdd949] text-xs font-medium">AI Analytics</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-6 px-3 py-1.5 bg-[#1c1917]/80 backdrop-blur-sm border border-[#e7ac08]/30 rounded-lg"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1.5,
                  ease: "easeInOut"
                }}
              >
                <span className="text-[#fdd949] text-xs font-medium">Real-time Data</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Elegant Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(23, 20, 18, 0.8) 70%, rgba(23, 20, 18, 1) 100%)'
        }}
      />
    </section>
  )
}

export default HeroSection
