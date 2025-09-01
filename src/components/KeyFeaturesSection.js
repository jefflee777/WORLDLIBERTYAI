'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef } from 'react'
import { 
  FaBrain, 
  FaChartLine, 
  FaEye, 
  FaTelegram,
  FaArrowRight
} from 'react-icons/fa'
import { BiTrendingUp } from 'react-icons/bi'

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
      delay: 0
    },
    {
      icon: FaChartLine,
      title: "Market Intelligence Reports",
      description: "AI-generated insights on volatility patterns, liquidity trends, and cross-exchange arbitrage opportunities.",
      highlight: "Smart Analytics",
      delay: 0.1
    },
    {
      icon: FaEye,
      title: "Whale Activity Monitor",
      description: "Stay ahead of major market movements by tracking whale wallets, large transactions, and institutional flows.",
      highlight: "Early Warnings",
      delay: 0.2
    },
    {
      icon: FaTelegram,
      title: "Telegram Mini App",
      description: "Access powerful AI insights directly in Telegram. No downloads, no hassle — just instant intelligence.",
      highlight: "Instant Access",
      delay: 0.3
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#171412] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle radial gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(231, 172, 8, 0.02) 0%, transparent 70%)`
          }}
        />
        
        {/* Animated background lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="features-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(231, 172, 8, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#features-grid)" />
          
          {/* Flowing lines */}
          <motion.path
            d="M 0 300 Q 500 200 1000 300"
            stroke="rgba(231, 172, 8, 0.1)"
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
          />
          <motion.path
            d="M 0 700 Q 500 800 1000 700"
            stroke="rgba(231, 172, 8, 0.1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,10"
            animate={{
              strokeDashoffset: [0, 20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
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
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 100 } : { width: 0 }}
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
            Key{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
              Features
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-[#d7d3d0] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                ease: "easeOut"
              }}
            >
              {/* Card */}
              <motion.div
                className="relative h-full p-6 lg:p-8 rounded-2xl border border-[#44403c]/40 bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 backdrop-blur-sm overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(231, 172, 8, 0.6)",
                  boxShadow: "0 20px 40px rgba(231, 172, 8, 0.1)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#e7ac08]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(231, 172, 8, 0.1) 0%, transparent 70%)`
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="text-2xl text-[#171412]" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-[#ffffff] mb-4 group-hover:text-[#fdd949] transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Highlight badge */}
                  <div className="inline-flex items-center mb-4">
                    <span className="px-3 py-1 bg-[#e7ac08]/20 border border-[#e7ac08]/30 rounded-full text-xs font-medium text-[#fdd949]">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[#aaa29d] leading-relaxed flex-1 mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Learn more link */}
                  <motion.div
                    className="flex items-center text-[#e7ac08] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn more</span>
                    <FaArrowRight className="ml-2 text-xs" />
                  </motion.div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#e7ac08]/10 to-transparent rounded-bl-2xl" />
              </motion.div>
              
              {/* Floating connection line */}
              {index < features.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gradient-to-r from-[#e7ac08]/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 1 + feature.delay }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="group px-8 py-4 bg-gradient-to-r from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 rounded-xl text-[#fdd949] font-medium hover:bg-gradient-to-r hover:from-[#e7ac08]/20 hover:to-[#fdd949]/20 hover:border-[#e7ac08]/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-3">
              Explore All Features
              <BiTrendingUp className="text-lg group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default KeyFeaturesSection
