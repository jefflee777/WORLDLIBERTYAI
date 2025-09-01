'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef } from 'react'
import { FaSearch, FaChartLine, FaBell, FaTelegram } from 'react-icons/fa'
import { BiAnalyse } from 'react-icons/bi'

const VisionMissionSection = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  // Enhanced scroll animations
  const leftY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 })

  const missions = [
    {
      icon: FaSearch,
      title: "Real-time AI transaction analysis",
      description: "Advanced algorithms monitor blockchain transactions instantly"
    },
    {
      icon: FaChartLine,
      title: "Market trend insights for investors", 
      description: "Data-driven intelligence for smarter investment decisions"
    },
    {
      icon: FaBell,
      title: "Instant alerts on abnormal activity",
      description: "Immediate notifications when unusual patterns are detected"
    },
    {
      icon: FaTelegram,
      title: "Accessible via Telegram Mini App",
      description: "Seamless access to AI insights through your messenger"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-[#171412]"
    >
      {/* Clean black background with subtle texture */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(231, 172, 8, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(231, 172, 8, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Visual - 5 columns */}
          <motion.div 
            ref={leftRef}
            className="lg:col-span-5 flex justify-center"
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -60 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Central AI Core */}
              <motion.div
                className="relative w-72 h-72 lg:w-80 lg:h-80 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                {/* Outer Network Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#e7ac08]/25"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.25, 0.5, 0.25],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-[#fdd949]/35"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    rotate: { duration: 35, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                
                {/* Central Core */}
                <motion.div
                  className="absolute inset-16 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at center, rgba(231, 172, 8, 0.9) 0%, rgba(231, 172, 8, 0.4) 70%),
                      linear-gradient(135deg, rgba(253, 217, 73, 0.5) 0%, rgba(231, 172, 8, 0.3) 100%)
                    `,
                    boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.4), 0 0 40px rgba(231, 172, 8, 0.3)',
                  }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BiAnalyse className="text-3xl lg:text-4xl text-[#171412]" />
                </motion.div>
                
                {/* Orbiting Data Nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-br from-[#fdd949] to-[#e7ac08] rounded-full"
                    style={{
                      left: `${50 + 38 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                      top: `${50 + 38 * Math.sin((i * 2 * Math.PI) / 6)}%`,
                      boxShadow: '0 0 10px rgba(253, 217, 73, 0.7)',
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { 
                        duration: 2.5, 
                        repeat: Infinity, 
                        delay: i * 0.4,
                        ease: "easeInOut" 
                      },
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - 7 columns */}
          <motion.div 
            ref={rightRef}
            className="lg:col-span-7 space-y-10"
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 60 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            {/* Section Header */}
            <div className="space-y-6">
              <motion.div
                initial={{ width: 0 }}
                animate={rightInView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-[2px] bg-gradient-to-r from-[#e7ac08] to-[#fdd949] rounded-full"
              />
              
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff] leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
                  Vision
                </span>
              </motion.h2>
            </div>

            {/* Vision Text */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p className="text-lg lg:text-xl text-[#d7d3d0] leading-relaxed">
                We believe financial intelligence should be{' '}
                <span className="text-[#fdd949] font-medium">transparent</span>,{' '}
                <span className="text-[#fdd949] font-medium">borderless</span>, and{' '}
                <span className="text-[#fdd949] font-medium">accessible</span> to everyone.
              </p>
              
              <p className="text-base lg:text-lg text-[#e7e5e4] leading-relaxed">
                World Liberty AI unlocks the hidden patterns of global markets using AI and blockchain — 
                giving you the power to act with clarity.
              </p>
            </motion.div>

            {/* Mission Section */}
            <div className="space-y-8">
              <motion.h3 
                className="text-xl lg:text-2xl font-bold text-[#ffffff]"
                initial={{ opacity: 0, y: 20 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Our Mission
              </motion.h3>
              
              <div className="grid gap-4">
                {missions.map((mission, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-[#44403c]/40 bg-[#1c1917]/30 hover:border-[#e7ac08]/50 hover:bg-[#1c1917]/50 transition-all duration-300"
                    initial={{ opacity: 0, x: 30 }}
                    animate={rightInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <mission.icon className="text-base text-[#171412]" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base lg:text-lg font-semibold text-[#ffffff] group-hover:text-[#fdd949] transition-colors duration-300 leading-tight">
                        {mission.title}
                      </h4>
                      <p className="text-sm text-[#aaa29d] leading-snug mt-1">
                        {mission.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default VisionMissionSection
