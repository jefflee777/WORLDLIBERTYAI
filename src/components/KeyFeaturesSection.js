'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FaBrain, 
  FaChartLine, 
  FaEye, 
  FaTelegram,
  FaArrowRight
} from 'react-icons/fa'
import { BiTrendingUp } from 'react-icons/bi'
import { BsTwitterX } from "react-icons/bs";

const KeyFeaturesSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const features = [
    {
      icon: FaBrain,
      title: "AI Transaction Engine",
      description: "Track WLFI & USD1 flows in real-time with advanced pattern recognition. Spot unusual trades and market anomalies instantly.",
      highlight: "Real-time Analysis",
      delay: 0,
      accentColor: "#39FF14"
    },
    {
      icon: FaChartLine,
      title: "Market Intelligence Reports",
      description: "AI-generated insights on volatility patterns, liquidity trends, and cross-exchange arbitrage opportunities.",
      highlight: "Smart Analytics",
      delay: 0.1,
      accentColor: "#00E0FF"
    },
    {
      icon: FaEye,
      title: "Whale Activity Monitor",
      description: "Stay ahead of major market movements by tracking whale wallets, large transactions, and institutional flows.",
      highlight: "Early Warnings",
      delay: 0.2,
      accentColor: "#B3FF66"
    },
    {
      icon: FaTelegram,
      title: "Telegram Mini App",
      description: "Access powerful AI insights directly in Telegram. No downloads, no hassle — just instant intelligence.",
      highlight: "Instant Access",
      delay: 0.3,
      accentColor: "#39FF14"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#000000] overflow-hidden py-20 "
    >
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0">
        {/* Neon radial gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(57, 255, 20, 0.03) 0%, transparent 70%)`
          }}
        />
        
        {/* Cyber grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="cyber-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(57, 255, 20, 0.6)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
        
        {/* Animated neon flow lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
          <motion.path
            d="M 0 300 Q 500 200 1000 300"
            stroke="rgba(57, 255, 20, 0.15)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,10"
            animate={{
              strokeDashoffset: [0, -20],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              filter: 'drop-shadow(0 0 5px rgba(57, 255, 20, 0.3))'
            }}
          />
          <motion.path
            d="M 0 700 Q 500 800 1000 700"
            stroke="rgba(0, 224, 255, 0.12)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="15,5"
            animate={{
              strokeDashoffset: [0, 20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              filter: 'drop-shadow(0 0 5px rgba(0, 224, 255, 0.3))'
            }}
          />
        </svg>
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
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 100 } : { width: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <div 
              className="h-[3px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent rounded-full"
              style={{
                boxShadow: '0 0 10px rgba(57, 255, 20, 0.8)'
              }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Key{' '}
            <span 
              className="text-[#39FF14]"
              style={{
                textShadow: '0 0 30px rgba(57, 255, 20, 0.3)'
              }}
            >
              Features
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-[#E5E5E5] text-balance max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Powerful AI-driven tools designed to give you unprecedented insight into the financial markets
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + feature.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {/* Card */}
              <motion.div
                className="relative h-full p-6 lg:p-8 rounded-2xl border border-[#2E2E2E]/60 bg-gradient-to-br from-[#1A1A1A]/80 to-[#0D0D0D]/60 backdrop-blur-sm overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: feature.accentColor + "60",
                  boxShadow: `0 20px 40px ${feature.accentColor}20`,
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {/* Neon glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.accentColor}15 0%, transparent 70%)`
                  }}
                />
                
                {/* Cyber border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.accentColor}20 0%, transparent 50%, ${feature.accentColor}10 100%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    padding: '1px'
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${feature.accentColor} 0%, ${feature.accentColor}CC 100%)`,
                      boxShadow: `0 10px 30px ${feature.accentColor}40`
                    }}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="text-2xl text-[#000000]" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-[#FFFFFF] mb-4 group-hover:text-[#39FF14] transition-colors duration-400 leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Highlight badge */}
                  <div className="inline-flex items-center mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: `${feature.accentColor}20`,
                        borderColor: `${feature.accentColor}40`,
                        color: feature.accentColor,
                        boxShadow: `0 0 15px ${feature.accentColor}30`
                      }}
                    >
                      {feature.highlight}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[#AAAAAA] leading-relaxed flex-1 mb-6 group-hover:text-[#E5E5E5] transition-colors duration-400">
                    {feature.description}
                  </p>
                </div>
                
                {/* Corner accent with neon glow */}
                <div 
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.accentColor}20 0%, transparent 70%)`
                  }}
                />
              </motion.div>
              
              {/* Connecting neon lines */}
              {index < features.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -left-8 w-8 h-[2px] rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${feature.accentColor}60 0%, transparent 100%)`,
                    boxShadow: `0 0 10px ${feature.accentColor}40`
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1 + feature.delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA with Neon Effect */}
        <motion.div
          className="text-center mt-16 lg:mt-20 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            delay: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <a href='https://x.com/worldlibertyai' target='_blank'>
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-[#39FF14]/10 to-[#B3FF66]/10 border border-[#39FF14]/40 rounded-xl text-[#39FF14] font-medium transition-all duration-500"
              style={{
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(57, 255, 20, 0.15)',
                borderColor: 'rgba(57, 255, 20, 0.8)',
                boxShadow: '0 0 40px rgba(57, 255, 20, 0.4)',
                color: '#B3FF66'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <span className="flex items-center gap-3">
                Explore All Features
                <BsTwitterX className="text-lg group-hover:rotate-12 transition-transform duration-400" />
              </span>
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default KeyFeaturesSection
