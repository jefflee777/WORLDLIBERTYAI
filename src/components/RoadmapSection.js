'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef } from 'react'
import { 
  FaRocket, 
  FaExpand, 
  FaNetworkWired,
  FaCheckCircle,
  FaClock,
  FaArrowRight
} from 'react-icons/fa'
import { BiTrendingUp, BiGlobe, BiStats } from 'react-icons/bi'

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
      color: "#e7ac08",
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
      color: "#fdd949",
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
      color: "#fac514",
      delay: 0.4
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#171412] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        
        {/* Animated connecting dots */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#e7ac08] rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
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
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#e7ac08] to-transparent rounded-full" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ffffff] leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
              Roadmap
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-[#d7d3d0] max-w-3xl mx-auto leading-relaxed"
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
            className="absolute left-8 lg:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e7ac08]/30 via-[#fdd949]/50 to-[#e7ac08]/30"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            style={{
              boxShadow: '0 0 10px rgba(231, 172, 8, 0.3)',
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
                  className="relative flex-shrink-0 mr-8 lg:mr-12"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glowing Node */}
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: `
                        radial-gradient(circle at center, ${phase.color} 0%, ${phase.color}CC 70%),
                        linear-gradient(135deg, ${phase.color} 0%, ${phase.color}DD 100%)
                      `,
                      boxShadow: `0 0 20px ${phase.color}60, inset 0 2px 0 rgba(255, 255, 255, 0.2)`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${phase.color}60, inset 0 2px 0 rgba(255, 255, 255, 0.2)`,
                        `0 0 30px ${phase.color}80, inset 0 2px 0 rgba(255, 255, 255, 0.3)`,
                        `0 0 20px ${phase.color}60, inset 0 2px 0 rgba(255, 255, 255, 0.2)`,
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: phase.delay,
                    }}
                  >
                    <phase.icon className="text-2xl text-[#171412]" />
                  </motion.div>
                  
                  {/* Status Indicator */}
                  <motion.div
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      phase.status === 'in-progress' ? 'bg-[#4ade80]' :
                      phase.status === 'upcoming' ? 'bg-[#fbbf24]' :
                      'bg-[#6b7280]'
                    }`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + phase.delay }}
                  >
                    {phase.status === 'in-progress' ? 
                      <FaClock className="text-[#171412]" /> :
                      phase.status === 'upcoming' ?
                      <FaArrowRight className="text-[#171412]" /> :
                      <FaCheckCircle className="text-[#171412]" />
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
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#ffffff]">
                        Phase {phase.id} – {phase.phase}
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-medium border"
                        style={{
                          backgroundColor: `${phase.color}20`,
                          borderColor: `${phase.color}40`,
                          color: phase.color,
                        }}
                      >
                        {phase.timeline}
                      </span>
                    </div>
                    
                    <p className="text-lg text-[#d7d3d0] leading-relaxed mb-6">
                      {phase.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <motion.div
                    className="p-6 bg-gradient-to-br from-[#1c1917]/50 to-[#171412]/30 border border-[#44403c]/30 rounded-xl"
                    whileHover={{ 
                      borderColor: `${phase.color}40`,
                      backgroundColor: "rgba(28, 25, 23, 0.6)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-[#ffffff] mb-4 flex items-center gap-2">
                      <BiStats className="text-[#e7ac08]" />
                      Key Deliverables
                    </h4>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {phase.deliverables.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-center gap-3 p-3 bg-[#171412]/40 border border-[#44403c]/20 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.4 + phase.delay + itemIndex * 0.1 
                          }}
                          whileHover={{ x: 5, backgroundColor: "rgba(28, 25, 23, 0.6)" }}
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
                          <span className="text-[#e7e5e4] text-sm leading-snug">
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
          <motion.button
            className="group px-8 py-4 bg-gradient-to-r from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 rounded-xl text-[#fdd949] font-medium hover:bg-gradient-to-r hover:from-[#e7ac08]/20 hover:to-[#fdd949]/20 hover:border-[#e7ac08]/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-3">
              Join Our Journey
              <BiTrendingUp className="text-lg group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default RoadmapSection
