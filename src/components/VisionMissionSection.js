'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
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
      color: "#e7ac08"
    },
    {
      icon: FaChartLine,
      title: "Market trend insights for investors", 
      description: "Data-driven intelligence and predictive analytics for smarter investment decisions",
      thumbnail: "/mission/2.png",
      color: "#fdd949"
    },
    {
      icon: FaBell,
      title: "Instant alerts on abnormal activity",
      description: "Immediate notifications and warnings when unusual market patterns are detected",
      thumbnail: "/mission/3.png",
      color: "#f87171"
    },
    {
      icon: FaTelegram,
      title: "Accessible via Telegram Mini App",
      description: "Seamless access to AI insights through your messenger with instant notifications",
      thumbnail: "/mission/4.png",
      color: "#0088cc"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative  overflow-hidden bg-[#171412]"
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
            <div className='sm:block hidden relative w-full mx-auto max-w-md lg:max-w-lg'>
            <Image src='/ourmission.png' alt='Image' width={400} height={400} className='scale-125 -mt-10'/>
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
              <p className="text-lg lg:text-xl text-[#d7d3d0] text-balance leading-relaxed">
                We believe financial intelligence should be{' '}
                <span className="text-[#fdd949] font-medium">transparent</span>,{' '}
                <span className="text-[#fdd949] font-medium">borderless</span>, and{' '}
                <span className="text-[#fdd949] font-medium">accessible</span> to everyone.
              </p>
              
              <p className="text-base lg:text-lg text-[#e7e5e4] leading-relaxed text-balance">
                World Liberty AI unlocks the hidden patterns of global markets using AI and blockchain 
                giving you the power to act with clarity.
              </p>
            </motion.div>

          </motion.div>
        </div>
            {/* Mission Section with Cards */}
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
                Mission
                </span>
              </motion.h2>
            </div>
            <div className="space-y-8">
              <div className="grid sm:grid-cols-4 gap-6 mt-5">
                {missions.map((mission, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-6 rounded-2xl border border-[#44403c]/40 bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 backdrop-blur-sm hover:border-[#e7ac08]/50 hover:bg-[#1c1917]/70 transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
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
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      />
                      
                      {/* Floating Icon */}
                      <motion.div
                        className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <mission.icon className="text-sm text-[#171412]" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Card Content */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-[#ffffff] group-hover:text-[#fdd949] transition-colors duration-300 leading-tight">
                        {mission.title}
                      </h4>
                      <p className="text-sm text-[#aaa29d] leading-relaxed">
                        {mission.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at bottom right, ${mission.color}10 0%, transparent 70%)`
                      }}
                    />

                    {/* Corner Accent */}
                    <div 
                      className="absolute top-0 left-0 w-20 h-20 rounded-br-2xl opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${mission.color}40 0%, transparent 70%)`
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
