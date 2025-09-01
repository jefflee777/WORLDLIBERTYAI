"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaTelegram, FaBars, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { BiNetworkChart, BiAnalyse } from 'react-icons/bi'
import Image from 'next/image';

const socialLinks = [
  {
    href: "https://x.com/worldlibertyai",
    icon: FaTwitter,
    label: "X",
    color: "#1da1f2",
    hover: "#fdd949"
  },
  {
    href: "https://t.me/worldlibertyai",
    icon: FaTelegram,
    label: "Telegram",
    color: "#0088cc",
    hover: "#e7ac08"
  },
  {
    href: "https://bscscan.com",
    icon: FaExternalLinkAlt,
    label: "BscScan",
    color: "#f0b90b",
    hover: "#fdd949"
  }
]

const navigationLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Vision', href: '#vision' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Community', href: '#community' }
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-4 z-50 flex justify-center pointer-events-none"
          >
            <nav
              className={`max-w-7xl w-[90%] sm:w-full mx-auto pointer-events-auto transition-all duration-300 p-3 ${
                scrollY > 50 
                  ? 'bg-[#171412]/95 border-[#e7ac08]/60' 
                  : 'bg-[#171412]/85 border-[#e7ac08]/30'
              }`}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${scrollY > 50 ? 'rgba(231, 172, 8, 0.6)' : 'rgba(231, 172, 8, 0.3)'}`,
                borderRadius: '16px',
                padding: '12px 16px sm:12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: scrollY > 50 
                  ? '0 8px 32px rgba(231, 172, 8, 0.2)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo Section */}
              <Link href="/" className="group inline-flex items-center gap-3" onClick={closeMobileMenu}>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="hidden sm:block">
                    <Image src='/logo.png' alt='logo' width={70} height={70} quality={100} className='sm:scale-200'/>
                  </div>
                </motion.div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navigationLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-[#d7d3d0] hover:text-[#fdd949] font-medium transition-colors duration-300 relative group"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                  >
                    {link.name}
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] transition-all duration-300 group-hover:w-full"
                    />
                  </motion.a>
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
                        className="group relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-[#1c1917]/50 border border-[#44403c]/50 hover:border-[#e7ac08]/60"
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          backgroundColor: 'rgba(231, 172, 8, 0.1)',
                          boxShadow: '0 4px 16px rgba(231, 172, 8, 0.3)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        aria-label={item.label}
                      >
                        <Icon size={16} className="text-[#e7ac08] group-hover:text-[#fdd949] transition-colors duration-300" />
                      </motion.a>
                    )
                  })}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(231, 172, 8, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLinkClick('#community')}
                >
                  Join Beta
                </motion.button>
              </div>

              {/* Mobile: Hamburger Menu Button */}
              <motion.button
                className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#1c1917]/50 border border-[#44403c]/50 text-[#e7ac08] transition-colors duration-300"
                onClick={toggleMobileMenu}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(231, 172, 8, 0.1)',
                  borderColor: 'rgba(231, 172, 8, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#171412]/95 backdrop-blur-md" />
            
            {/* Menu Content */}
            <motion.div
              className="relative z-10 flex flex-col h-full pt-24 px-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Links */}
              <div className="space-y-6 mb-12">
                {navigationLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-2xl font-bold text-[#ffffff] hover:text-[#fdd949] transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                className="w-full py-4 mb-8 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold text-lg rounded-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
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
                      className="flex flex-col items-center gap-2 text-[#e7ac08] hover:text-[#fdd949] transition-colors duration-300"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-[#1c1917]/50 border border-[#44403c]/50">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-semibold text-[#aaa29d]">{item.label}</span>
                    </motion.a>
                  )
                })}
              </div>

              {/* World Liberty AI Badge - Mobile */}
              <motion.div
                className="flex items-center justify-center gap-2 mt-12 text-[#aaa29d]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <BiAnalyse className="w-4 h-4 text-[#e7ac08]" />
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
