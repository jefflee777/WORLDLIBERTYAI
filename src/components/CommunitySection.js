'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef } from 'react'
import { 
  FaTelegram,  
  FaUsers,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa'
import { BiRocket, BiNetworkChart } from 'react-icons/bi'
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineAppShortcut } from "react-icons/md";

const CommunitySection = () => {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const communityButtons = [
    {
      icon: FaTelegram,
      label: "Join Our Telegram",
      description: "Connect with the community",
      href: "#telegram",
      color: "#0088cc",
      gradient: "from-[#0088cc] to-[#29b6f6]",
      delay: 0
    },
    {
      icon: BsTwitterX,
      label: "Follow on X/Twitter",
      description: "Stay updated with news",
      href: "https://x.com/worldlibertyai",
      color: "#1da1f2",
      gradient: "from-[#1da1f2] to-[#1976d2]",
      delay: 0.1
    },
    {
      icon: MdOutlineAppShortcut,
      label: "Mini App",
      description: "Learn about the platform",
      href: "https://t.me/WLFIai_bot/live",
      color: "#e7ac08",
      gradient: "from-[#e7ac08] to-[#fdd949]",
      delay: 0.2
    }
  ]

  const stats = [
    { icon: FaUsers, value: "110K+", label: "Community Members" },
    { icon: FaGlobe, value: "50+", label: "Countries" },
    { icon: BiNetworkChart, value: "24/7", label: "Live Updates" }
  ]

  return (
    <section 
      id='community'
      ref={sectionRef}
      className="relative py-14 lg:py-20 bg-[#171412] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        
        {/* Decorative network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 800">
          <defs>
            <pattern id="network-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="2" fill="#e7ac08" opacity="0.5"/>
              <line x1="100" y1="100" x2="200" y2="100" stroke="#e7ac08" strokeWidth="1" opacity="0.3"/>
              <line x1="100" y1="100" x2="100" y2="200" stroke="#e7ac08" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-pattern)" />
          
          {/* Animated connection lines */}
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={i * 200 + 100}
              y1="200"
              x2={i * 200 + 300}
              y2="600"
              stroke="rgba(231, 172, 8, 0.1)"
              strokeWidth="2"
              strokeDasharray="10,10"
              animate={{
                strokeDashoffset: [0, -20],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Decorative top accent */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 150 } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
          </motion.div>
          
          {/* Main Headline */}
          <motion.h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#ffffff] block mb-2">Join the</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] via-[#fdd949] to-[#e7ac08]">
              Liberty Network
            </span>
          </motion.h2>
          
          {/* Subheading */}
          <motion.p
            className="text-lg text-balance lg:text-2xl text-[#d7d3d0] max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Be part of a global movement redefining{' '}
            <span className="text-[#fdd949] font-medium">transparency</span> in financial intelligence.
            <br />
            Connect, learn, and shape the future of AI-powered market insights.
          </motion.p>

          {/* Community Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-[#e7ac08]/20 to-[#fdd949]/20 border border-[#e7ac08]/30 rounded-xl flex items-center justify-center mx-auto mb-3"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(231, 172, 8, 0.2)",
                      "0 0 20px rgba(231, 172, 8, 0.4)",
                      "0 0 10px rgba(231, 172, 8, 0.2)",
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <stat.icon className="text-[#e7ac08] text-xl" />
                </motion.div>
                <div className="text-2xl font-bold text-[#ffffff] mb-1">{stat.value}</div>
                <div className="text-sm text-[#aaa29d]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {communityButtons.map((button, index) => (
            <motion.a
              key={index}
              href={button.href}
              className="group relative flex-1 w-full sm:w-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 1 + button.delay,
                ease: "easeOut"
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative px-8 py-6 bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 border border-[#44403c]/40 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-[#e7ac08]/60"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(231, 172, 8, 0.15)",
                  backgroundColor: "rgba(28, 25, 23, 0.8)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#e7ac08]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-xl flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <button.icon className="text-2xl text-[#171412]" />
                  </motion.div>
                  
                  {/* Label */}
                  <h3 className="text-lg lg:text-xl font-bold text-[#ffffff] mb-2 group-hover:text-[#fdd949] transition-colors duration-300">
                    {button.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-[#aaa29d] mb-4 leading-relaxed">
                    {button.description}
                  </p>
                  
                  {/* Arrow */}
                  <motion.div
                    className="flex items-center justify-center text-[#e7ac08] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium mr-2">Get Started</span>
                    <FaArrowRight className="text-xs" />
                  </motion.div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e7ac08]/10 to-transparent rounded-bl-2xl" />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Bottom Message */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#1c1917]/40 border border-[#e7ac08]/20 rounded-full"
            whileHover={{ 
              borderColor: "rgba(231, 172, 8, 0.4)",
              backgroundColor: "rgba(28, 25, 23, 0.6)"
            }}
            transition={{ duration: 0.3 }}
          >
            <BiRocket className="text-[#e7ac08] text-lg" />
            <span className="text-[#d7d3d0] text-sm font-medium">
              Ready to revolutionize financial intelligence?
            </span>
            <motion.div 
              className="w-2 h-2 bg-[#4ade80] rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CommunitySection
