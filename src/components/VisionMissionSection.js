'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaSearch, FaChartLine, FaBell, FaTelegram } from 'react-icons/fa'
import { BiAnalyse } from 'react-icons/bi'
import Image from 'next/image'

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
      description: "Advanced algorithms monitor blockchain transactions instantly with pattern recognition",
      thumbnail: "/mission/1.png",
      color: "#39FF14"
    },
    {
      icon: FaChartLine,
      title: "Market trend insights for investors", 
      description: "Data-driven intelligence and predictive analytics for smarter investment decisions",
      thumbnail: "/mission/2.png",
      color: "#00E0FF"
    },
    {
      icon: FaBell,
      title: "Instant alerts on abnormal activity",
      description: "Immediate notifications and warnings when unusual market patterns are detected",
      thumbnail: "/mission/3.png",
      color: "#B3FF66"
    },
    {
      icon: FaTelegram,
      title: "Accessible via Telegram Mini App",
      description: "Seamless access to AI insights through your messenger with instant notifications",
      thumbnail: "/mission/4.png",
      color: "#39FF14"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000000]"
    >
      {/* Futuristic black background with cyber grid */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.4) 1px, transparent 1px)
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
            <div className='sm:block hidden relative w-full mx-auto max-w-md lg:max-w-lg'>
              <Image 
                src='/ourmission.png' 
                alt='Image' 
                width={400} 
                height={400} 
                className='scale-125 -mt-10'
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(57, 255, 20, 0.3))'
                }}
              />
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
                className="h-[2px] bg-gradient-to-r from-[#39FF14] to-[#B3FF66] rounded-full"
                style={{
                  boxShadow: '0 0 10px rgba(57, 255, 20, 0.6)'
                }}
              />
              
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Our{' '}
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#B3FF66]"
                  style={{
                    textShadow: '0 0 30px rgba(57, 255, 20, 0.3)'
                  }}
                >
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
              <p className="text-lg lg:text-xl text-[#E5E5E5] text-balance leading-relaxed">
                We believe financial intelligence should be{' '}
                <span className="text-[#39FF14] font-medium">transparent</span>,{' '}
                <span className="text-[#39FF14] font-medium">borderless</span>, and{' '}
                <span className="text-[#39FF14] font-medium">accessible</span> to everyone.
              </p>
              
              <p className="text-base lg:text-lg text-[#E5E5E5]/80 leading-relaxed text-balance">
                WLFI unlocks the hidden patterns of global markets using AI and blockchain 
                giving you the power to act with clarity.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Section with Cards */}
        <div className="space-y-6 mt-16">
          <motion.div
            initial={{ width: 0 }}
            animate={rightInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="h-[2px] bg-gradient-to-r from-[#39FF14] to-[#00E0FF] rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(57, 255, 20, 0.6)'
            }}
          />
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Our{' '}
            <span 
              className="text-[#39FF14]"
              style={{
                textShadow: '0 0 30px rgba(57, 255, 20, 0.3)'
              }}
            >
              Mission
            </span>
          </motion.h2>
        </div>

        <div className="space-y-8">
          <div className="grid sm:grid-cols-4 gap-6 mt-5">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className="group relative p-6 rounded-2xl border border-[#2E2E2E]/60 bg-gradient-to-br from-[#1A1A1A]/80 to-[#0D0D0D]/60 backdrop-blur-sm hover:border-[#39FF14]/50 hover:bg-[#1A1A1A]/90 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Thumbnail Image */}
                <motion.div
                  className="relative w-full h-fit mb-4 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={mission.thumbnail} 
                    alt={mission.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  />
                  
                  {/* Floating Icon with Neon Glow */}
                  <motion.div
                    className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-[#39FF14] to-[#B3FF66] rounded-lg flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: '0 0 20px rgba(57, 255, 20, 0.8)'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: '0 0 15px rgba(57, 255, 20, 0.4)'
                    }}
                  >
                    <mission.icon className="text-sm text-[#000000]" />
                  </motion.div>
                </motion.div>
                
                {/* Card Content */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors duration-300 leading-tight">
                    {mission.title}
                  </h4>
                  <p className="text-sm text-[#AAAAAA] leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {/* Neon Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${mission.color}15 0%, transparent 70%)`
                  }}
                />

                {/* Enhanced Corner Accent with Neon */}
                <div 
                  className="absolute top-0 left-0 w-20 h-20 rounded-br-2xl opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${mission.color}40 0%, transparent 70%)`,
                    boxShadow: `inset 0 0 20px ${mission.color}20`
                  }}
                />

                {/* Subtle Border Glow on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    borderColor: `${mission.color}40`,
                    boxShadow: `0 0 20px ${mission.color}20`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default VisionMissionSection
