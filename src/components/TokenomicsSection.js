'use client'

import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { 
  FaKey, 
  FaBolt, 
  FaGift,
  FaChartPie,
  FaCoins,
  FaUsers
} from 'react-icons/fa'
import { BiTrendingUp } from 'react-icons/bi'

const TokenomicsSection = () => {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [hovered, setHovered] = useState(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Tokenomics data with enhanced styling
  const tokenomicsData = [
    { 
      title: 'Data Rewards', 
      value: 40, 
      color: '#e7ac08',
      description: 'Incentivize community data verification and contribution',
      icon: FaGift
    },
    { 
      title: 'Ecosystem & Growth', 
      value: 25, 
      color: '#fdd949',
      description: 'Platform development and strategic partnerships',
      icon: BiTrendingUp
    },
    { 
      title: 'Team & Advisors', 
      value: 15, 
      color: '#aaa29d',
      description: 'Core team and advisor allocations with vesting',
      icon: FaUsers
    },
    { 
      title: 'Liquidity & Reserve', 
      value: 10, 
      color: '#7a726c',
      description: 'Market stability and emergency reserves',
      icon: FaCoins
    },
    { 
      title: 'Marketing', 
      value: 10, 
      color: '#44403c',
      description: 'Community building and user acquisition',
      icon: FaChartPie
    },
  ]

  const utilityFeatures = [
    {
      icon: FaKey,
      title: "Access AI reports",
      description: "Unlock premium market intelligence and whale tracking reports"
    },
    {
      icon: FaBolt,
      title: "Advanced transaction analysis",
      description: "Pay for real-time pattern recognition and anomaly detection"
    },
    {
      icon: FaGift,
      title: "Earn verification rewards",
      description: "Get WLFI tokens for validating transaction data and insights"
    }
  ]

  const formatLabel = ({ dataEntry }) => {
    return hovered === dataEntry.title ? `${dataEntry.value}%` : ''
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-10 lg:py-32 bg-[#171412] overflow-hidden"
    >
      {/* Background with Gold Highlights */}
      <div className="absolute inset-0">
        
        {/* Animated Chart Pattern Background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="chart-pattern" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="75" cy="75" r="30" fill="none" stroke="#e7ac08" strokeWidth="1" opacity="0.5"/>
              <circle cx="75" cy="75" r="15" fill="none" stroke="#fdd949" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chart-pattern)" />
          
          {/* Rotating elements */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "500px 500px" }}
          >
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.line
                key={i}
                x1="500"
                y1="400"
                x2="500"
                y2="350"
                stroke="rgba(231, 172, 8, 0.1)"
                strokeWidth="2"
                transform={`rotate(${angle} 500 500)`}
                animate={{
                  strokeDasharray: ["0,10", "5,5", "0,10"],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.g>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
              WLFI
            </span>{' '}
            Tokenomics
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-[#d7d3d0] text-balance max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fueling the World Liberty AI ecosystem through{' '}
            <span className="text-[#fdd949] font-medium">strategic token allocation</span> and{' '}
            <span className="text-[#fdd949] font-medium">community incentives</span>.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Interactive Pie Chart */}
          <motion.div 
            className="lg:col-span-7 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-lg">
              {/* Chart Container */}
              <motion.div
                ref={chartRef}
                className="relative p-8 bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 backdrop-blur-sm border border-[#e7ac08]/20 rounded-3xl"
                whileHover={{ 
                  borderColor: "rgba(231, 172, 8, 0.4)",
                  boxShadow: "0 20px 60px rgba(231, 172, 8, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Chart */}
                <motion.div
                  className="w-full aspect-square"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                >
                  <PieChart
                    data={tokenomicsData}
                    animate={isInView}
                    animationDuration={1500}
                    animationEasing="easeOutCubic"
                    label={formatLabel}
                    labelStyle={{
                      fontSize: '6px',
                      fontWeight: 'bold',
                      fill: '#ffffff',
                      fontFamily: 'system-ui',
                    }}
                    labelPosition={85}
                    radius={45}
                    lineWidth={25}
                    paddingAngle={2}
                    segmentsShift={(index) => (selectedSegment === index ? 8 : hovered === tokenomicsData[index]?.title ? 4 : 0)}
                    segmentsStyle={(index) => ({
                      cursor: 'pointer',
                      filter: hovered === tokenomicsData[index]?.title ? 'brightness(1.2)' : 'brightness(1)',
                      transition: 'all 0.3s ease',
                    })}
                    onMouseOver={(_, index) => {
                      setHovered(tokenomicsData[index]?.title)
                    }}
                    onMouseOut={() => {
                      setHovered(null)
                    }}
                    onClick={(_, index) => {
                      setSelectedSegment(selectedSegment === index ? null : index)
                    }}
                  />
                </motion.div>
                
                {/* Center Label */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-[#e7ac08] mb-2">WLFI</div>
                    <div className="text-sm text-[#aaa29d]">Token Distribution</div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Chart Legend */}
              <motion.div
                className="mt-8 space-y-4 grid grid-cols-2 gap-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {tokenomicsData.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedSegment === index 
                        ? 'border-[#e7ac08]/60 bg-[#1c1917]/60' 
                        : hovered === item.title
                        ? 'border-[#e7ac08]/40 bg-[#1c1917]/40'
                        : 'border-[#44403c]/30 bg-[#1c1917]/20'
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSegment(selectedSegment === index ? null : index)}
                    onMouseEnter={() => setHovered(item.title)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full flex-shrink-0 hidden"
                      style={{ backgroundColor: item.color }}
                      animate={{
                        scale: selectedSegment === index ? 1.3 : 1,
                        boxShadow: selectedSegment === index 
                          ? `0 0 15px ${item.color}80` 
                          : `0 0 5px ${item.color}40`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <item.icon className="text-[#e7ac08] text-sm " />
                        <h4 className="font-semibold text-[#ffffff] group-hover:text-[#fdd949] transition-colors">
                          {item.title}
                        </h4>
                        <span className="font-bold text-[#e7ac08] text-lg ml-auto">
                          {item.value}%
                        </span>
                      </div>
                      {selectedSegment === index && (
                        <motion.p 
                          className="text-sm text-[#aaa29d] mt-2 leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Utility Features */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.h3 
                className="text-2xl lg:text-3xl font-bold text-[#ffffff] flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="w-1 h-8 bg-gradient-to-b from-[#e7ac08] to-[#fdd949] rounded-full" />
                Token Utility
              </motion.h3>
              
              <motion.p
                className="text-lg text-[#d7d3d0] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                WLFI tokens power the entire ecosystem, enabling access to premium features and rewarding community participation.
              </motion.p>
            </div>

            <div className="space-y-6">
              {utilityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group flex items-start gap-4 p-6 bg-gradient-to-br from-[#1c1917]/50 to-[#171412]/30 border border-[#44403c]/30 rounded-2xl hover:border-[#e7ac08]/40 hover:bg-[#1c1917]/60 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(231, 172, 8, 0.1)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="text-xl text-[#171412]" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-[#ffffff] mb-2 group-hover:text-[#fdd949] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-[#aaa29d] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Supply Info */}
            <motion.div
              className="p-6 bg-gradient-to-br from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ 
                borderColor: "rgba(231, 172, 8, 0.5)",
                backgroundColor: "rgba(231, 172, 8, 0.15)"
              }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-2xl flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(231, 172, 8, 0.3)",
                      "0 0 30px rgba(231, 172, 8, 0.5)",
                      "0 0 20px rgba(231, 172, 8, 0.3)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaCoins className="text-2xl text-[#171412]" />
                </motion.div>
                <div>
                  <h4 className="text-2xl font-bold text-[#ffffff] mb-1">Total Supply</h4>
                  <p className="text-3xl font-bold text-[#fdd949]">1,000,000,000</p>
                  <p className="text-sm text-[#aaa29d]">WLFI Tokens</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default TokenomicsSection
