'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { FaRocket } from 'react-icons/fa'
import { useRef } from 'react'
import Image from 'next/image'

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
      {/* Futuristic Neon Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top center, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
              linear-gradient(180deg, rgba(57, 255, 20, 0.05) 0%, rgba(13, 13, 13, 1) 30%, rgba(0, 0, 0, 1) 100%)
            `
          }}
        />
        
        {/* Futuristic Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Subtle Cyber Glow Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent opacity-20"
              style={{
                top: `${20 + i * 30}%`,
                left: '10%',
                right: '10%',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
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
            transition={{ 
              duration: 1, 
              delay: 0.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {/* Main Headline */}
            <div className="space-y-6 sm:mt-0 mt-20">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.4, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <motion.span 
                  className="text-[#FFFFFF] block"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  The Future of
                </motion.span>
                <motion.span 
                  className="text-[#39FF14] block"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{
                    textShadow: '0 0 30px rgba(57, 255, 20, 0.3)'
                  }}
                >
                  Financial Liberty,
                </motion.span>
                <motion.span 
                  className="text-[#FFFFFF] block"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Powered by AI.
                </motion.span>
              </motion.h1>
              
              {/* Neon Underline */}
              <motion.div 
                className="relative mx-auto lg:mx-0"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <div 
                  className="h-[2px] bg-gradient-to-r from-[#39FF14] via-[#B3FF66] to-transparent rounded-full"
                  style={{
                    boxShadow: '0 0 10px rgba(57, 255, 20, 0.8)'
                  }}
                />
              </motion.div>
            </div>

            {/* Subheading */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-xl text-balance text-[#E5E5E5]/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                delay: 0.7, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              Real-time insights on global transactions, market trends, and whale movements 
              all in one intelligent hub.
            </motion.p>

            {/* CTA Button - Futuristic Neon Style */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                delay: 1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <a href='https://t.me/WLFIai_bot/live' target='_blank'>
                <motion.button
                  className="group relative px-8 py-4 sm:px-10 sm:py-5 font-bold text-lg sm:text-xl text-[#000000] rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #39FF14 0%, #B3FF66 100%)',
                    boxShadow: '0 10px 40px rgba(57, 255, 20, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
                    transform: 'perspective(1000px) rotateX(-5deg) rotateY(5deg)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: -2,
                    rotateY: 2,
                    boxShadow: '0 20px 60px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.2)',
                  }}
                  whileTap={{
                    scale: 0.98,
                    rotateX: -8,
                    rotateY: 8,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  {/* Neon Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
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
                  
                  {/* 3D Edge Effect with Neon Glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl" 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Visual - Enhanced Globe */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.5, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <div className="relative">
              {/* Main Globe Container */}
              <motion.div
                ref={globeRef}
                className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]"
                animate={floatingAnimation}
              >
                <div className="relative">
                  <Image 
                    src='/heroimage2.png' 
                    alt='Hero Image' 
                    width={700} 
                    height={700} 
                    quality={100} 
                    className='scale-150'
                    style={{
                      filter: 'drop-shadow(0 0 40px rgba(57, 255, 20, 0.3))'
                    }}
                  />
                  
                  {/* Cyber Rings Around Globe */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#39FF14]/20"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    style={{
                      boxShadow: '0 0 30px rgba(57, 255, 20, 0.2), inset 0 0 30px rgba(57, 255, 20, 0.1)',
                    }}
                  />
                  
                  {/* Inner Neon Ring */}
                  <motion.div
                    className="absolute inset-12 rounded-full border border-[#39FF14]/40"
                    animate={{
                      rotate: -360,
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    style={{
                      boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)',
                    }}
                  />
                  
                  {/* Pulsing Data Points */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-[#39FF14] rounded-full"
                      style={{
                        left: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                        top: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 6)}%`,
                        boxShadow: '0 0 15px rgba(57, 255, 20, 0.8)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Futuristic Floating Labels */}
              <motion.div
                className="absolute -top-6 -left-6 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#39FF14]/40 rounded-lg"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)'
                }}
              >
                <span className="text-[#39FF14] text-xs font-medium">AI Analytics</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-6 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#00E0FF]/40 rounded-lg"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1.5,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 20px rgba(0, 224, 255, 0.3)'
                }}
              >
                <span className="text-[#00E0FF] text-xs font-medium">Real-time Data</span>
              </motion.div>
              
              {/* Top Right Cyber Label */}
              <motion.div
                className="absolute -top-2 -right-8 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#B3FF66]/40 rounded-lg"
                animate={{
                  x: [0, 5, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 15px rgba(179, 255, 102, 0.3)'
                }}
              >
                <span className="text-[#B3FF66] text-xs font-medium">Neural Net</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Futuristic Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(13, 13, 13, 0.8) 70%, rgba(0, 0, 0, 1) 100%)'
        }}
      />
    </section>
  )
}

export default HeroSection
