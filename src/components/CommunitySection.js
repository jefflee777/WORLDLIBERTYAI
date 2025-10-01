'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
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
      gradient: "from-[#39FF14] to-[#39FF14]",
      delay: 0
    },
    {
      icon: BsTwitterX,
      label: "Follow on X/Twitter",
      description: "Stay updated with news",
      href: "https://x.com/worldlibertyai",
      color: "#1da1f2", 
      gradient: "from-[#39FF14] to-[#39FF14]",
      delay: 0.1
    },
    {
      icon: MdOutlineAppShortcut,
      label: "Mini App",
      description: "Learn about the platform",
      href: "https://t.me/WLFIai_bot/live",
      color: "#39FF14",
      gradient: "from-[#39FF14] to-[#39FF14]",
      delay: 0.2
    }
  ]

  return (
    <section 
      id='community'
      ref={sectionRef}
      className="relative py-14 bg-[#000000] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        
        {/* Decorative network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
          <defs>
            <pattern id="network-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="2" fill="#39FF14" opacity="0.4"/>
              <line x1="100" y1="100" x2="200" y2="100" stroke="#39FF14" strokeWidth="1" opacity="0.2"/>
              <line x1="100" y1="100" x2="100" y2="200" stroke="#39FF14" strokeWidth="1" opacity="0.2"/>
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
              stroke="rgba(57, 255, 20, 0.08)"
              strokeWidth="2"
              strokeDasharray="10,10"
              animate={{
                strokeDashoffset: [0, -20],
                opacity: [0.08, 0.2, 0.08],
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
            className="flex justify-center"
            initial={{ width: 0 }}
            animate={isInView ? { width: 150 } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent rounded-full" />
          </motion.div>
          
          {/* Main Headline */}
          <motion.h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#FFFFFF] block mb-2">Join the</span>
            <span className="text-[#39FF14]">
              Liberty Network
            </span>
          </motion.h2>
          
          {/* Subheading */}
          <motion.p
            className="text-lg text-balance lg:text-2xl text-[#e5e5e5c3] max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Be part of a global movement redefining{' '}
            <span className="text-[#39FF14] font-medium">transparency</span> in financial intelligence.
            <br />
            Connect, learn, and shape the future of AI-powered market insights.
          </motion.p>
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
                className="relative px-8 py-6 bg-[#1A1A1A]/60 border border-[#2E2E2E] rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-[#39FF14]"
                whileHover={{
                  backgroundColor: "#1A1A1A",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${button.gradient} rounded-xl flex items-center justify-center`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <button.icon className="text-2xl text-[#000000]" />
                  </motion.div>
                  
                  {/* Label */}
                  <h3 className="text-lg lg:text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#39FF14] transition-colors duration-300">
                    {button.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-[#AAAAAA] mb-4 leading-relaxed">
                    {button.description}
                  </p>
                  
                  {/* Arrow */}
                  <motion.div
                    className="flex items-center justify-center text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium mr-2">Get Started</span>
                    <FaArrowRight className="text-xs" />
                  </motion.div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#39FF14]/10 to-transparent rounded-bl-2xl" />
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
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#1A1A1A]/60 border border-[#39FF14]/20 rounded-full"
            whileHover={{ 
              borderColor: "#39FF14",
              backgroundColor: "#1A1A1A"
            }}
            transition={{ duration: 0.3 }}
          >
            <BiRocket className="text-[#39FF14] text-lg" />
            <span className="text-[#E5E5E5] text-sm font-medium">
              Ready to revolutionize financial intelligence?
            </span>
            <motion.div 
              className="w-2 h-2 bg-[#39FF14] rounded-full"
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
