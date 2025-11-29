'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FaTelegram, 
  FaExternalLinkAlt
} from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { RiBnbFill } from "react-icons/ri";
import Image from 'next/image'

const Footer = () => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amoun: 0.3 })

  const quickLinks = [
    { label: "Web Agent", href: "/ai" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Community", href: "#community" }
  ]

  const socialLinks = [
    {
      icon: FaTelegram,
      href: "https://t.me/worldlibertyai",
      label: "Telegram",
      color: "#0088cc"
    },
    {
      icon: BsTwitterX,
      href: "https://x.com/worldlibertyai",
      label: "Twitter/X",
      color: "#1da1f2"
    },
    {
      icon: RiBnbFill,
      href: "https://bscscan.com",
      label: "BscScan",
      color: "#f0b90b"
    }
  ]

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#000000] border-t border-[#39FF14]/30 overflow-hidden"
    >
      {/* Top Border Glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Logo & Tagline Section */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4">
              <Image src='/logo.png' alt='logo' width={70} height={70} quality={100} className='scale-200 ml-0 sm:ml-5'/>
            </div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-xl lg:text-2xl font-semibold text-[#FFFFFF] leading-tight">
                World Liberty AI
              </h4>
              <p className="text-lg text-[#E5E5E5] leading-relaxed">
                <span className="text-[#39FF14] font-medium">Transparent</span>,{' '}
                <span className="text-[#39FF14] font-medium">Intelligent</span>,{' '}
                <span className="text-[#39FF14] font-medium">Borderless</span>
              </p>
              <p className="text-[#AAAAAA] text-balance leading-relaxed max-w-lg">
                Revolutionizing financial intelligence through AI-powered blockchain analysis 
                and real-time market insights.
              </p>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <h5 className="text-lg font-semibold text-[#FFFFFF] mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#39FF14] to-[#B3FF66] rounded-full" />
              Quick Links
            </h5>
            <nav className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="group flex items-center text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                >
                  <span className="group-hover:font-medium transition-all duration-300">
                    {link.label}
                  </span>
                  <motion.div
                    className="w-0 group-hover:w-2 h-[1px] bg-[#39FF14] ml-2 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h5 className="text-lg font-semibold text-[#FFFFFF] mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#39FF14] to-[#B3FF66] rounded-full" />
              Connect
            </h5>
            <div className="space-y-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-xl border border-[#2E2E2E] bg-[#1A1A1A]/40 hover:border-[#39FF14] hover:bg-[#1A1A1A]/80 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className="w-10 h-10 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <social.icon className="text-[#39FF14] text-lg" />
                  </motion.div>
                  <div className="flex-1">
                    <span className="text-[#FFFFFF] font-medium group-hover:text-[#39FF14] transition-colors duration-300">
                      {social.label}
                    </span>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 3 }}
                  >
                    <FaExternalLinkAlt className="text-[#AAAAAA] text-sm" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 border-t border-[#2E2E2E] flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Copyright */}
          <div className="flex items-center gap-4 text-[#AAAAAA]">
            <span className="text-sm">
              © 2025 World Liberty AI. All rights reserved.
            </span>
            <motion.div 
              className="w-1 h-1 bg-[#39FF14] rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Status Badge */}
          <motion.div
            className="flex items-center gap-3 px-4 py-2 bg-[#1A1A1A]/60 border border-[#2E2E2E] rounded-full"
            whileHover={{ 
              borderColor: "#39FF14",
              backgroundColor: "#1A1A1A"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-2 h-2 bg-[#39FF14] rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[#39FF14] text-sm font-medium">
              System Online
            </span>
            <span className="text-[#AAAAAA] text-xs">
              99.9% uptime
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
    </footer>
  )
}

export default Footer
