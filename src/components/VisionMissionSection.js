'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { FaSearch, FaChartLine, FaBell, FaTelegram } from 'react-icons/fa'
import { BiAnalyse } from 'react-icons/bi'

const VisionMissionSection = () => {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const leftX = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const rightX = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

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
      title: "Accessible directly via Telegram Mini App",
      description: "Seamless access to AI insights through your favorite messenger"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ opacity }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at center, rgba(231, 172, 8, 0.03) 0%, transparent 70%),
              linear-gradient(135deg, rgba(28, 25, 23, 1) 0%, rgba(23, 20, 18, 1) 100%)
            `
          }}
        />
        
        {/* Subtle connecting lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(231, 172, 8, 0.5)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Visual */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            style={{ x: leftX }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-lg">
              {/* Central AI Core */}
              <motion.div
                className="relative w-80 h-80 mx-auto"
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* Outer Network Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#e7ac08]/30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-[#fdd949]/40"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                
                {/* Central Core */}
                <motion.div
                  className="absolute inset-20 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at center, rgba(231, 172, 8, 0.8) 0%, rgba(231, 172, 8, 0.3) 70%),
                      linear-gradient(135deg, rgba(253, 217, 73, 0.4) 0%, rgba(231, 172, 8, 0.2) 100%)
                    `,
                    boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3), 0 0 50px rgba(231, 172, 8, 0.4)',
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BiAnalyse className="text-4xl text-[#171412]" />
                </motion.div>
                
                {/* Orbiting Data Nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-gradient-to-br from-[#fdd949] to-[#e7ac08] rounded-full"
                    style={{
                      left: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                      top: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 6)}%`,
                      boxShadow: '0 0 12px rgba(253, 217, 73, 0.6)',
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3,
                        ease: "easeInOut" 
                      },
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Floating Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                {[...Array(3)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M ${200 + 150 * Math.cos((i * 2 * Math.PI) / 3)} ${200 + 150 * Math.sin((i * 2 * Math.PI) / 3)} Q 200 200 ${200 + 150 * Math.cos(((i + 1) * 2 * Math.PI) / 3)} ${200 + 150 * Math.sin(((i + 1) * 2 * Math.PI) / 3)}`}
                    stroke="rgba(231, 172, 8, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="5,5"
                    animate={{
                      strokeDashoffset: [0, -10],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 4, repeat: Infinity, delay: i * 0.5 },
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="space-y-12"
            style={{ x: rightX }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Section Title */}
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-[3px] bg-gradient-to-r from-[#e7ac08] to-[#fdd949] rounded-full"
              />
              
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ffffff] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
                  Vision
                </span>
              </motion.h2>
            </div>

            {/* Vision Text */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl lg:text-2xl text-[#d7d3d0] leading-relaxed font-light">
                We believe financial intelligence should be{' '}
                <span className="text-[#fdd949] font-medium">transparent</span>,{' '}
                <span className="text-[#fdd949] font-medium">borderless</span>, and{' '}
                <span className="text-[#fdd949] font-medium">accessible</span> to everyone.
              </p>
              
              <p className="text-lg lg:text-xl text-[#e7e5e4] leading-relaxed">
                World Liberty AI unlocks the hidden patterns of global markets using AI and blockchain — 
                giving you the power to act with clarity.
              </p>
            </motion.div>

            {/* Mission Points */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[#ffffff] mb-8">Our Mission</h3>
              
              <div className="grid gap-6">
                {missions.map((mission, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-2xl border border-[#44403c]/30 bg-gradient-to-br from-[#1c1917]/50 to-[#171412]/30 backdrop-blur-sm hover:border-[#e7ac08]/40 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 8px 25px rgba(231, 172, 8, 0.1)',
                    }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <mission.icon className="text-xl text-[#171412]" />
                    </motion.div>
                    
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-semibold text-[#ffffff] group-hover:text-[#fdd949] transition-colors duration-300">
                        {mission.title}
                      </h4>
                      <p className="text-[#aaa29d] leading-relaxed">
                        {mission.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionSection
