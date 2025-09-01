'use client'

import { motion } from 'motion/react'
import { FaRocket } from 'react-icons/fa'
import { useEffect, useRef } from 'react'

const HeroSection = () => {
  const globeRef = useRef(null)

  // Floating animation for the holographic globe
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  // Pulse animation for the AI mesh
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#171412] via-[#1c1917] to-[#171412]" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#e7ac08] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-[#ffffff] block">The Future of</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949] block">
                  Financial Liberty,
                </span>
                <span className="text-[#ffffff] block">Powered by AI.</span>
              </motion.h1>
              
              {/* Glowing Underline */}
              <motion.div 
                className="w-24 lg:w-32 h-1 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] mx-auto lg:mx-0 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>

            {/* Subheading */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-[#e7e5e4] leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Real-time insights on global transactions, market trends, and whale movements — 
              all in one intelligent hub.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
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

          {/* Right Visual - Holographic Globe */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Globe Container */}
              <motion.div
                ref={globeRef}
                className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]"
                animate={floatingAnimation}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#e7ac08] opacity-30"
                  animate={pulseAnimation}
                  style={{
                    boxShadow: '0 0 80px rgba(231, 172, 8, 0.5)',
                  }}
                />
                
                {/* Inner Glow Ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-[#fdd949] opacity-50"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    boxShadow: 'inset 0 0 50px rgba(253, 217, 73, 0.3)',
                  }}
                />
                
                {/* Core Globe */}
                <motion.div
                  className="absolute inset-16 rounded-full bg-gradient-to-br from-[#e7ac08] to-[#fdd949] opacity-80"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3), 0 0 60px rgba(231, 172, 8, 0.7)',
                  }}
                />
                
                {/* AI Data Points */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-[#fdd949] rounded-full"
                    style={{
                      left: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 12)}%`,
                      top: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 12)}%`,
                      boxShadow: '0 0 10px rgba(253, 217, 73, 0.8)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Floating Data Labels */}
              <motion.div
                className="absolute -top-8 -left-8 px-4 py-2 bg-[#1c1917] border border-[#e7ac08] rounded-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <span className="text-[#fdd949] text-sm font-semibold">AI Analytics</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-8 px-4 py-2 bg-[#1c1917] border border-[#e7ac08] rounded-lg"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <span className="text-[#fdd949] text-sm font-semibold">Real-time Data</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#171412] to-transparent" />
    </section>
  )
}

export default HeroSection
