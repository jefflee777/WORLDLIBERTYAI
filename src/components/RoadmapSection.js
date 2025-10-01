'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FaRocket, 
  FaExpand, 
  FaNetworkWired,
  FaCheckCircle,
  FaClock,
  FaArrowRight
} from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { BiGlobe, BiStats } from 'react-icons/bi'

const RoadmapSection = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const roadmapPhases = [
    {
      id: 1,
      phase: "Foundation",
      timeline: "0–6 months",
      status: "in-progress",
      icon: FaRocket,
      description: "AI engine development, WLFI/USD1 datasets integration, and Telegram Mini App beta launch.",
      deliverables: [
        "Core AI Transaction Analysis Engine",
        "WLFI & USD1 Real-time Data Integration", 
        "Telegram Mini App Beta Release",
        "Initial User Testing & Feedback"
      ],
      color: "#39FF14",
      delay: 0
    },
    {
      id: 2,
      phase: "Expansion",
      timeline: "6–12 months",
      status: "upcoming",
      icon: FaExpand,
      description: "Multi-asset analysis expansion, strategic exchange partnerships, and automated intelligence reports.",
      deliverables: [
        "Multi-Asset Support (BTC, ETH, SOL)",
        "Exchange API Partnerships",
        "Automated Report Generation",
        "Advanced Whale Tracking System"
      ],
      color: "#B3FF66",
      delay: 0.2
    },
    {
      id: 3,
      phase: "Ecosystem Growth",
      timeline: "1–2 years",
      status: "planned",
      icon: FaNetworkWired,
      description: "Scale to 100+ strategic partnerships, deploy real-time on-chain index, and reach 1M+ active users.",
      deliverables: [
        "100+ Strategic Partnerships",
        "Real-time On-chain Market Index",
        "1M+ Active User Milestone",
        "Global Market Intelligence Hub"
      ],
      color: "#00E0FF",
      delay: 0.4
    }
  ]

  return (
    <section 
      id='roadmap'
      ref={sectionRef}
      className="relative py-14 lg:py-28 bg-[#000000] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        
        {/* Subtle animated connecting dots */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#39FF14] rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 120 } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent rounded-full" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#B3FF66]">
              Roadmap
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-[#E5E5E5] text-balance max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building the future of financial intelligence through strategic phases of growth and innovation
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Timeline Line */}
          <motion.div
            ref={timelineRef}
            className="sm:flex hidden absolute left-8 lg:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#39FF14]/30 via-[#39FF14]/60 to-[#39FF14]/30"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            style={{
              transformOrigin: 'top',
            }}
          />
          
          {/* Timeline Phases */}
          <div className="space-y-16 lg:space-y-20">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                className="relative flex items-start"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 1 + phase.delay,
                  ease: "easeOut"
                }}
              >
                {/* Timeline Node */}
                <motion.div
                  className="relative sm:block hidden flex-shrink-0 mr-8 lg:mr-12"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Clean Node */}
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 border-2"
                    style={{
                      background: `linear-gradient(135deg, ${phase.color} 0%, ${phase.color}DD 100%)`,
                      borderColor: `${phase.color}`,
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: phase.delay,
                    }}
                  >
                    <phase.icon className="text-2xl text-[#000000]" />
                  </motion.div>
                  
                  {/* Status Indicator */}
                  <motion.div
                    className={`absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-[#000000] ${
                      phase.status === 'in-progress' ? 'bg-[#39FF14]' :
                      phase.status === 'upcoming' ? 'bg-[#B3FF66]' :
                      'bg-[#AAAAAA]'
                    }`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + phase.delay }}
                  >
                    {phase.status === 'in-progress' ? 
                      <FaClock className="text-[#000000]" /> :
                      phase.status === 'upcoming' ?
                      <FaArrowRight className="text-[#000000]" /> :
                      <FaCheckCircle className="text-[#000000]" />
                    }
                  </motion.div>
                </motion.div>

                {/* Phase Content */}
                <motion.div
                  className="flex-1 min-w-0"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Phase Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFFFFF]">
                        Phase {phase.id} – {phase.phase}
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full sm:text-sm text-xs font-medium border"
                        style={{
                          backgroundColor: `${phase.color}20`,
                          borderColor: `${phase.color}60`,
                          color: phase.color,
                        }}
                      >
                        {phase.timeline}
                      </span>
                    </div>
                    
                    <p className="text-sm sm:text-lg text-[#E5E5E5] leading-relaxed mb-6">
                      {phase.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <motion.div
                    className="p-6 bg-[#1A1A1A]/60 border border-[#2E2E2E] rounded-xl"
                    whileHover={{ 
                      borderColor: `${phase.color}`,
                      backgroundColor: "#1A1A1A"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-[#FFFFFF] mb-4 flex items-center gap-2">
                      <BiStats className="text-[#39FF14]" />
                      Key Deliverables
                    </h4>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {phase.deliverables.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-center gap-3 p-3 bg-[#0D0D0D]/60 border border-[#2E2E2E] rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.4 + phase.delay + itemIndex * 0.1 
                          }}
                          whileHover={{ 
                            x: 5, 
                            backgroundColor: "#1A1A1A",
                            borderColor: phase.color
                          }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: phase.color }}
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7] 
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: itemIndex * 0.3,
                            }}
                          />
                          <span className="text-[#FFFFFF] text-sm leading-snug">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <a href='https://x.com/worldlibertyai' target='_blank'>
            <motion.button
              className="group px-8 py-4 bg-[#39FF14]/10 border border-[#39FF14]/40 rounded-xl text-[#39FF14] font-medium hover:bg-[#39FF14]/20 hover:border-[#39FF14] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                Join Our Journey
                <BsTwitterX className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </span>
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default RoadmapSection
