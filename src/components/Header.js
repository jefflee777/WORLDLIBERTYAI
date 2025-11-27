"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaTelegram, FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { BiAnalyse } from 'react-icons/bi'
import Image from 'next/image';
import { RiBnbFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const socialLinks = [
  {
    href: "https://x.com/worldlibertyai",
    icon: BsTwitterX,
    label: "X",
    color: "#1da1f2",
    hover: "#39FF14"
  },
  {
    href: "https://t.me/worldlibertyai",
    icon: FaTelegram,
    label: "Telegram",
    color: "#0088cc",
    hover: "#39FF14"
  },
  {
    href: "https://bscscan.com",
    icon: RiBnbFill,
    label: "BscScan",
    color: "#f0b90b",
    hover: "#39FF14"
  }
]

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Web Agent', href: '/ai' },
  { name: 'Tokenomics', href: '#tokenomics' }
]

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > scrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = (e) => {
    e.stopPropagation()
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLinkClick = (href) => {
    closeMobileMenu()
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 100
            }}
            className="fixed left-0 right-0 top-4 z-50 flex justify-center pointer-events-none"
          >
            <nav
              className={`max-w-7xl w-[90%] sm:w-full mx-auto pointer-events-auto transition-all duration-500 ease-out p-3 ${
                scrollY > 50 
                  ? 'bg-[#0D0D0D]/98 border-[#39FF14]/60' 
                  : 'bg-[#0D0D0D]/90 border-[#39FF14]/30'
              }`}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${scrollY > 50 ? 'rgba(57, 255, 20, 0.6)' : 'rgba(57, 255, 20, 0.3)'}`,
                borderRadius: '16px',
                padding: '12px 16px sm:12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: scrollY > 50 
                  ? '0 8px 32px rgba(57, 255, 20, 0.2)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.4)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo Section */}
              <Link href="/" className="group inline-flex items-center gap-3" onClick={closeMobileMenu}>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                >
                  <div className="block">
                    <Image src='/navlogo.png' alt='logo' width={70} height={70} quality={100} className='scale-150'/>
                  </div>
                </motion.div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navigationLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <motion.div
                      className="text-[#E5E5E5] hover:text-[#39FF14] font-medium transition-all duration-400 relative group cursor-pointer"
                      whileHover={{ y: -1 }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      {link.name}
                      <motion.div 
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#39FF14] to-[#B3FF66] transition-all duration-400 group-hover:w-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Desktop: Social Icons + CTA */}
              <div className="hidden sm:flex items-center gap-4">
                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-400 bg-[#1A1A1A]/70 border border-[#2E2E2E]/50 hover:border-[#39FF14]/60"
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          backgroundColor: 'rgba(57, 255, 20, 0.1)',
                          boxShadow: '0 4px 20px rgba(57, 255, 20, 0.3)',
                          borderColor: 'rgba(57, 255, 20, 0.8)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        aria-label={item.label}
                      >
                        <Icon 
                          size={16} 
                          className="text-[#39FF14] group-hover:text-[#B3FF66] transition-colors duration-300" 
                        />
                      </motion.a>
                    )
                  })}
                </div>

                {/* CTA Button */}
                {/* <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-[#39FF14] to-[#B3FF66] text-[#000000] font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-400"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(57, 255, 20, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleLinkClick('#community')}
                >
                  Join Beta
                </motion.button> */}
              </div>

              {/* Mobile: Hamburger Menu Button */}
              <motion.button
                className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#1A1A1A]/70 border border-[#2E2E2E]/50 text-[#39FF14] transition-all duration-400"
                onClick={toggleMobileMenu}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(57, 255, 20, 0.1)',
                  borderColor: 'rgba(57, 255, 20, 0.6)',
                  boxShadow: "0 4px 16px rgba(57, 255, 20, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <FaTimes size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <FaBars size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-[#000000]/98 backdrop-blur-md" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Menu Content */}
            <motion.div
              className="relative z-10 flex flex-col h-full pt-24 px-6"
              initial={{ y: -50, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.98 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Links */}
              <div className="space-y-6 mb-12">
                {navigationLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-2xl font-bold text-[#FFFFFF] hover:text-[#39FF14] transition-colors duration-400"
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2, 
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileTap={{ scale: 0.98, x: 4 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                className="w-full py-4 mb-8 bg-gradient-to-r from-[#39FF14] to-[#B3FF66] text-[#000000] font-bold text-lg rounded-xl shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLinkClick('#community')}
              >
                Join Beta
              </motion.button>

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-6">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 text-[#39FF14] hover:text-[#B3FF66] transition-colors duration-400"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.7, 
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400 bg-[#1A1A1A]/70 border border-[#2E2E2E]/50 hover:border-[#39FF14]/60 hover:bg-[#39FF14]/10">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-semibold text-[#AAAAAA]">{item.label}</span>
                    </motion.a>
                  )
                })}
              </div>

              {/* World Liberty AI Badge - Mobile */}
              <motion.div
                className="flex items-center justify-center gap-2 mt-12 text-[#AAAAAA]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 1, 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <BiAnalyse className="w-4 h-4 text-[#39FF14]" />
                <span className="text-sm font-medium">World Liberty AI • Financial Intelligence</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
