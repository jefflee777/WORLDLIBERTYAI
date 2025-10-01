'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
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

  // Updated tokenomics data with new color scheme
  const tokenomicsData = [
    { 
      title: 'Data Rewards', 
      value: 40, 
      color: '#39FF14',
      description: 'Incentivize community data verification and contribution',
      icon: FaGift
    },
    { 
      title: 'Ecosystem & Growth', 
      value: 25, 
      color: '#B3FF66',
      description: 'Platform development and strategic partnerships',
      icon: BiTrendingUp
    },
    { 
      title: 'Team & Advisors', 
      value: 15, 
      color: '#00E0FF',
      description: 'Core team and advisor allocations with vesting',
      icon: FaUsers
    },
    { 
      title: 'Liquidity & Reserve', 
      value: 10, 
      color: '#AAAAAA',
      description: 'Market stability and emergency reserves',
      icon: FaCoins
    },
    { 
      title: 'Marketing', 
      value: 10, 
      color: '#2E2E2E',
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
      description: "Get WLFIAI tokens for validating transaction data and insights"
    }
  ]

  const formatLabel = ({ dataEntry }) => {
    return hovered === dataEntry.title ? `${dataEntry.value}%` : ''
  }

  return (
    <section 
      id='tokenomics'
      ref={sectionRef}
      className="relative py-10 lg:py-32 bg-[#000000] overflow-hidden"
    >
      {/* Background with Neon Green Highlights */}
      <div className="absolute inset-0">
        
        {/* Animated Chart Pattern Background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="chart-pattern" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="75" cy="75" r="30" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.4"/>
              <circle cx="75" cy="75" r="15" fill="none" stroke="#B3FF66" strokeWidth="1" opacity="0.2"/>
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
                stroke="rgba(57, 255, 20, 0.1)"
                strokeWidth="2"
                transform={`rotate(${angle} 500 500)`}
                animate={{
                  strokeDasharray: ["0,10", "5,5", "0,10"],
                  opacity: [0.1, 0.2, 0.1],
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
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent rounded-full" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#B3FF66]">
              WLFIAI
            </span>{' '}
            Tokenomics
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-[#E5E5E5] text-balance max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fueling the ecosystem through{' '}
            <span className="text-[#39FF14] font-medium">strategic token allocation</span> and{' '}
            <span className="text-[#39FF14] font-medium">community incentives</span>.
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
                className="relative p-8 bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#2E2E2E] rounded-3xl"
                whileHover={{ 
                  borderColor: "#39FF14",
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
                      fill: '#FFFFFF',
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
                    <div className="text-3xl lg:text-4xl font-bold text-[#39FF14] mb-2">WLFIAI</div>
                    <div className="text-sm text-[#AAAAAA]">Token Distribution</div>
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
                        ? 'border-[#39FF14] bg-[#1A1A1A]/80' 
                        : hovered === item.title
                        ? 'border-[#39FF14]/60 bg-[#1A1A1A]/60'
                        : 'border-[#2E2E2E] bg-[#1A1A1A]/40'
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <item.icon className="text-[#39FF14] text-sm" />
                        <h4 className="font-semibold text-[#FFFFFF] group-hover:text-[#39FF14] transition-colors">
                          {item.title}
                        </h4>
                        <span className="font-bold text-[#39FF14] text-lg ml-auto">
                          {item.value}%
                        </span>
                      </div>
                      {selectedSegment === index && (
                        <motion.p 
                          className="text-sm text-[#AAAAAA] mt-2 leading-relaxed"
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
                className="text-2xl lg:text-3xl font-bold text-[#FFFFFF] flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="w-1 h-8 bg-gradient-to-b from-[#39FF14] to-[#B3FF66] rounded-full" />
                Token Utility
              </motion.h3>
              
              <motion.p
                className="text-lg text-[#E5E5E5] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                WLFIAI tokens power the entire ecosystem, enabling access to premium features and rewarding community participation.
              </motion.p>
            </div>

            <div className="space-y-6">
              {utilityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group flex items-start gap-4 p-6 bg-[#1A1A1A]/60 border border-[#2E2E2E] rounded-2xl hover:border-[#39FF14] hover:bg-[#1A1A1A]/80 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-[#39FF14] to-[#B3FF66] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="text-xl text-[#000000]" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#39FF14] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-[#AAAAAA] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Supply Info */}
            <motion.div
              className="p-6 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ 
                borderColor: "#39FF14",
                backgroundColor: "rgba(57, 255, 20, 0.15)"
              }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#39FF14] to-[#B3FF66] rounded-2xl flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaCoins className="text-2xl text-[#000000]" />
                </motion.div>
                <div>
                  <h4 className="text-2xl font-bold text-[#FFFFFF] mb-1">Total Supply</h4>
                  <p className="text-3xl font-bold text-[#39FF14]">1,000,000,000</p>
                  <p className="text-sm text-[#AAAAAA]">WLFIAI Tokens</p>
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
