'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { FaTelegram, FaBars, FaTimes } from 'react-icons/fa'
import { RiBnbFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const Navbar = () => {
  const [hidden, setHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Intelligent Scroll Logic (Hide on down, Show on up)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Web Agent', href: '/ai' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' }
  ]

  const socialLinks = [
    {
      href: "https://x.com/worldlibertyai",
      icon: BsTwitterX,
      label: "X"
    },
    {
      href: "https://t.me/worldlibertyai",
      icon: FaTelegram,
      label: "Telegram"
    },
    {
      href: "https://bscscan.com/token/0x649b4cbad977e053fe8d1719d41ecd299812f266",
      icon: RiBnbFill,
      label: "BscScan"
    }
  ]

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav 
          className="pointer-events-auto flex items-center justify-between pl-4 pr-2 py-2 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-5xl"
        >
          {/* --- Logo Section --- */}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 pr-8">
            <div className="relative w-18 h-8">
               {/* Replace with your logo image */}
               <Image src='/navlogo.png' alt='WLAI' fill className="object-cover " />
            </div>
          </Link>


          {/* --- Desktop Links --- */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/5">
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className="relative px-5 py-2 text-xs font-medium text-[#AAA] hover:text-white transition-colors uppercase tracking-wide rounded-full hover:bg-white/5 block">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>


          {/* --- Right Actions --- */}
          <div className="flex items-center pr-8">
            
            {/* Socials (Desktop) */}
            <div className="hidden sm:flex gap-3.5 items-center">
              {socialLinks.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center p-1 justify-center text-[#666] hover:text-[#39FF14] hover:bg-[#39FF14]/10 rounded-full transition-all"
                >
                  <item.icon size={28} />
                </a>
              ))}
            </div>
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-full hover:bg-white/10"
            >
              <FaBars size={16} />
            </button>
          </div>
        </nav>
      </motion.header>


      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-2xl md:hidden flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-lg font-bold text-white">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-white bg-white/5 rounded-full"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 flex flex-col justify-center px-6 gap-6">
              {navigationLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-medium text-[#888] hover:text-[#39FF14] transition-colors tracking-tight"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer Info */}
            <div className="p-8 border-t border-white/5 space-y-6">
               <div className="flex gap-4 justify-center">
                  {socialLinks.map((item, i) => (
                    <a 
                      key={i} 
                      href={item.href}
                      className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-white hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
                    >
                      <item.icon size={20} />
                    </a>
                  ))}
               </div>
               
               <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#444] uppercase tracking-widest">
                 <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse" />
                 System Operational
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar