'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaCircle, 
  FaEye,
  FaBolt,
  FaChartLine
} from 'react-icons/fa'
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi'

const LiveDataPreviewSection = () => {
  const sectionRef = useRef(null)
  const [currentPrice, setCurrentPrice] = useState(4.27)
  const [whaleIndex, setWhaleIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.1
        return Math.max(0.1, prev + change)
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Whale alerts data
  const whaleAlerts = [
    { amount: "2.5M WLFI", action: "SELL", exchange: "Binance", time: "2m ago", impact: "high" },
    { amount: "850K USD1", action: "BUY", exchange: "Coinbase", time: "5m ago", impact: "medium" },
    { amount: "1.8M WLFI", action: "TRANSFER", exchange: "Wallet", time: "8m ago", impact: "low" },
    { amount: "3.2M USD1", action: "BUY", exchange: "Kraken", time: "12m ago", impact: "high" },
    { amount: "650K WLFI", action: "SELL", exchange: "Uniswap", time: "15m ago", impact: "medium" },
  ]

  // Chart data points for animation
  const chartPoints = [
    { x: 10, y: 60 },
    { x: 25, y: 45 },
    { x: 40, y: 55 },
    { x: 55, y: 35 },
    { x: 70, y: 50 },
    { x: 85, y: 25 },
    { x: 100, y: 40 },
    { x: 115, y: 20 },
    { x: 130, y: 35 },
    { x: 145, y: 15 },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Deep Gold to Black Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(231, 172, 8, 0.15) 0%, rgba(231, 172, 8, 0.08) 25%, rgba(28, 25, 23, 0.95) 60%, rgba(23, 20, 18, 1) 100%),
            radial-gradient(circle at 20% 30%, rgba(231, 172, 8, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, rgba(23, 20, 18, 0.9) 0%, rgba(23, 20, 18, 1) 100%)
          `
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating data points */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#e7ac08]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Section Header */}
            <div className="space-y-6">
              <motion.div
                className="flex"
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                <div className="h-[3px] bg-gradient-to-r from-[#e7ac08] to-[#fdd949] rounded-full" />
              </motion.div>
              
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-[#ffffff] block">See the Market</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
                  Like Never Before
                </span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-xl lg:text-2xl text-[#d7d3d0] leading-relaxed">
                Our AI continuously scans the blockchain to deliver{' '}
                <span className="text-[#fdd949] font-medium">real-time financial intelligence</span>.
              </p>
              
              <p className="text-lg text-[#e7e5e4] leading-relaxed">
                From whale alerts to cross-market deviations — WLFI AI keeps you ahead of the curve 
                with instant insights and actionable intelligence.
              </p>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="p-4 bg-[#1c1917]/40 border border-[#44403c]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaEye className="text-[#e7ac08]" />
                  <span className="text-sm text-[#aaa29d]">Monitoring</span>
                </div>
                <div className="text-2xl font-bold text-[#ffffff]">24/7</div>
              </div>
              
              <div className="p-4 bg-[#1c1917]/40 border border-[#44403c]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaBolt className="text-[#fdd949]" />
                  <span className="text-sm text-[#aaa29d]">Response Time</span>
                </div>
                <div className="text-2xl font-bold text-[#ffffff]">&lt;1s</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Data Visualization */}
          <motion.div 
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              
              {/* Main Chart Container */}
              <motion.div
                className="relative p-6 bg-gradient-to-br from-[#1c1917]/80 to-[#171412]/60 backdrop-blur-sm border border-[#e7ac08]/20 rounded-2xl mb-6"
                whileHover={{ 
                  borderColor: "rgba(231, 172, 8, 0.4)",
                  boxShadow: "0 20px 40px rgba(231, 172, 8, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Chart Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-[#e7ac08] text-xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#ffffff]">WLFI/USD</h3>
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className="text-2xl font-bold text-[#fdd949]"
                          key={currentPrice}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          ${currentPrice.toFixed(3)}
                        </motion.span>
                        <BiTrendingUp className="text-[#4ade80] text-sm" />
                        <span className="text-[#4ade80] text-sm">+2.4%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-2 h-2 bg-[#4ade80] rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[#4ade80] text-sm font-medium">Live</span>
                  </div>
                </div>
                
                {/* Animated Chart */}
                <div className="relative h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 160 80">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(231, 172, 8, 0.3)" />
                        <stop offset="100%" stopColor="rgba(231, 172, 8, 0.05)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Chart Line */}
                    <motion.path
                      d={`M ${chartPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                      stroke="#e7ac08"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    
                    {/* Fill Area */}
                    <motion.path
                      d={`M ${chartPoints[0].x},${chartPoints[0].y} L ${chartPoints.map(p => `${p.x},${p.y}`).join(' L ')} L ${chartPoints[chartPoints.length - 1].x},80 L ${chartPoints[0].x},80 Z`}
                      fill="url(#chartGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    />
                    
                    {/* Data Points */}
                    {chartPoints.map((point, i) => (
                      <motion.circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="#fdd949"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      />
                    ))}
                  </svg>
                  
                  {/* Glowing overlay */}
                  <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#e7ac08]/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
              </motion.div>

              {/* Whale Alerts Feed */}
              <motion.div
                className="relative p-4 bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 backdrop-blur-sm border border-[#44403c]/30 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FaEye className="text-[#fdd949]" />
                  <h4 className="text-lg font-semibold text-[#ffffff]">Whale Alerts</h4>
                  <motion.div 
                    className="w-2 h-2 bg-[#f87171] rounded-full ml-auto"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                
                <div className="space-y-3 max-h-40 overflow-hidden">
                  {whaleAlerts.slice(0, 3).map((alert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#171412]/40 border border-[#44403c]/20 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      whileHover={{ backgroundColor: "rgba(28, 25, 23, 0.6)" }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`w-2 h-2 rounded-full ${
                            alert.impact === 'high' ? 'bg-[#f87171]' : 
                            alert.impact === 'medium' ? 'bg-[#fbbf24]' : 'bg-[#4ade80]'
                          }`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#ffffff] font-medium text-sm">{alert.amount}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              alert.action === 'BUY' ? 'bg-[#4ade80]/20 text-[#4ade80]' :
                              alert.action === 'SELL' ? 'bg-[#f87171]/20 text-[#f87171]' :
                              'bg-[#fbbf24]/20 text-[#fbbf24]'
                            }`}>
                              {alert.action}
                            </span>
                          </div>
                          <div className="text-xs text-[#aaa29d]">{alert.exchange} • {alert.time}</div>
                        </div>
                      </div>
                      
                      {alert.action === 'BUY' ? 
                        <FaArrowUp className="text-[#4ade80] text-sm" /> :
                        alert.action === 'SELL' ?
                        <FaArrowDown className="text-[#f87171] text-sm" /> :
                        <FaCircle className="text-[#fbbf24] text-xs" />
                      }
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default LiveDataPreviewSection
