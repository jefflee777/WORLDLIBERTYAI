'use client'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaCircle, 
  FaEye,
  FaBolt,
  FaChartLine,
  FaStar,
  FaGem
} from 'react-icons/fa'
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi'
import Image from 'next/image'

const LiveDataPreviewSection = () => {
  const sectionRef = useRef(null)
  const [wlfiCoins, setWlfiCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [whaleIndex, setWhaleIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

// Fetch real WLFI and USD1 coin data from CoinGecko
useEffect(() => {
  const fetchCoinData = async () => {
    try {
      setLoading(true)

      // API call to get World Liberty Financial data
      const wlfiRequest = fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=world-liberty-financial&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
      ).then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch WLFI data')
        }
        return response.json()
      })
      
      // API call to get USD1 data using the correct ID from the search results
      const usd1Request = fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=usd1-wlfi&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
      ).then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch USD1 data')
        }
        return response.json()
      })
      
      // Use Promise.all to fetch both data sets concurrently
      const [wlfiData, usd1Data] = await Promise.all([wlfiRequest, usd1Request])

      // Combine the results into a single array
      const combinedData = [...wlfiData, ...usd1Data];

      setWlfiCoins(combinedData)
      setError(null)
    } catch (err) {
      console.error('Error fetching coin data:', err)
      setError(err.message)

      // Fallback data for World Liberty Financial and USD1
      const fallbackData = [
        {
          id: 'world-liberty-financial',
          symbol: 'wlfi',
          name: 'World Liberty Financial',
          image: 'https://via.placeholder.com/64/e7ac08/171412?text=WLFI',
          current_price: 0.0034,
          price_change_percentage_24h: 12.45,
          price_change_percentage_7d: 28.67,
          market_cap: 3400000000,
          total_volume: 125000000,
          sparkline_in_7d: {
            price: [0.0028, 0.0031, 0.0029, 0.0032, 0.0035, 0.0033, 0.0034]
          }
        },
        {
          id: 'usd1-wlfi',
          symbol: 'usd1',
          name: 'USD1',
          image: 'https://via.placeholder.com/64/2775CA/ffffff?text=USD1',
          current_price: 1.00,
          price_change_percentage_24h: 0.02,
          price_change_percentage_7d: 0.01,
          market_cap: 32000000000,
          total_volume: 4200000000,
          sparkline_in_7d: {
            price: [0.999, 1.001, 1.000, 0.999, 1.001, 1.000, 1.000]
          }
        }
      ]
      setWlfiCoins(fallbackData)
    } finally {
      setLoading(false)
    }
  }

  fetchCoinData()
  
  // Refresh data every 30 seconds
  const interval = setInterval(fetchCoinData, 30000)
  return () => clearInterval(interval)
}, [])

  // Generate dynamic chart points based on real price data
  const generateChartPoints = (sparklineData) => {
    if (!sparklineData || !sparklineData.length) {
      return [
        { x: 10, y: 60 }, { x: 25, y: 45 }, { x: 40, y: 55 }, { x: 55, y: 35 },
        { x: 70, y: 50 }, { x: 85, y: 25 }, { x: 100, y: 40 }, { x: 115, y: 20 },
        { x: 130, y: 35 }, { x: 145, y: 15 }
      ]
    }
    
    const minPrice = Math.min(...sparklineData)
    const maxPrice = Math.max(...sparklineData)
    const range = maxPrice - minPrice || 1
    
    return sparklineData.map((price, index) => ({
      x: 10 + (index * 135 / (sparklineData.length - 1)),
      y: 70 - ((price - minPrice) / range * 50)
    }))
  }

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toFixed(2)}`
  }

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${(marketCap / 1e3).toFixed(2)}K`
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Enhanced WLFI Background */}
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
      
      {/* Animated WLFI Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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
              scale: [0, 1.5, 0],
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
                <span className="text-[#ffffff] block">Track WLFI</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
                  Performance Live
                </span>
              </motion.h2>
            </div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-xl lg:text-2xl text-[#d7d3d0] leading-relaxed">
                Real-time intelligence for{' '}
                <span className="text-[#fdd949] font-medium">World Liberty Financial & USD1</span> tokens.
              </p>
              
              <p className="text-lg text-[#e7e5e4] leading-relaxed">
                From whale movements to price predictions, stay ahead with live WLFI market intelligence.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="p-4 bg-[#1c1917]/40 border border-[#e7ac08]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaEye className="text-[#e7ac08]" />
                  <span className="text-sm text-[#aaa29d]">Monitoring</span>
                </div>
                <div className="text-2xl font-bold text-[#fdd949]">24/7</div>
              </div>
              
              <div className="p-4 bg-[#1c1917]/40 border border-[#e7ac08]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaBolt className="text-[#fdd949]" />
                  <span className="text-sm text-[#aaa29d]">WLFI Tokens</span>
                </div>
                <div className="text-2xl font-bold text-[#e7ac08]">{wlfiCoins.length}</div>
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
              
              {/* WLFI Coins Display */}
              <motion.div
                className="relative overflow-hidden p-6 bg-gradient-to-br from-[#1c1917]/80 to-[#171412]/60 backdrop-blur-sm border border-[#e7ac08]/20 rounded-2xl mb-6"
                whileHover={{ 
                  borderColor: "rgba(231, 172, 8, 0.4)",
                  boxShadow: "0 20px 40px rgba(231, 172, 8, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FaGem className="text-[#e7ac08] text-xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#ffffff]">WLFI Ecosystem</h3>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 bg-[#4ade80] rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[#4ade80] text-sm font-medium">Live Data</span>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <motion.div 
                      className="w-8 h-8 border-2 border-[#e7ac08]/30 border-t-[#e7ac08] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="ml-3 text-[#e7ac08]">Loading WLFI data...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wlfiCoins.map((coin, index) => {
                      const chartPoints = generateChartPoints(coin.sparkline_in_7d?.price)
                      
                      return (
                        <motion.div
                          key={coin.id}
                          className="p-4 bg-[#171412]/40 border border-[#44403c]/20 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ borderColor: "rgba(231, 172, 8, 0.4)" }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img 
                                  src={coin.image} 
                                  alt={coin.name}
                                  className="w-10 h-10 rounded-full border-2 border-[#e7ac08]/30"
                                  onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/40/e7ac08/171412?text=${coin.symbol.charAt(0).toUpperCase()}`
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="text-[#ffffff] font-bold flex items-center gap-2">
                                  {coin.name}
                                </h4>
                                <p className="text-[#aaa29d] text-sm">{coin.symbol.toUpperCase()}</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-xl font-bold text-[#fdd949]">
                                {formatPrice(coin.current_price)}
                              </div>
                              {coin.price_change_percentage_24h !== null && (
                                <div className={`flex items-center gap-1 text-sm ${
                                  coin.price_change_percentage_24h >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'
                                }`}>
                                  {coin.price_change_percentage_24h >= 0 ? 
                                    <BiTrendingUp /> : <BiTrendingDown />
                                  }
                                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Mini Chart */}
                          <div className="relative h-16 mb-3">
                            <svg className="w-full h-full" viewBox="0 0 160 50">
                              <defs>
                                <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="rgba(231, 172, 8, 0.3)" />
                                  <stop offset="100%" stopColor="rgba(231, 172, 8, 0.05)" />
                                </linearGradient>
                              </defs>
                              
                              <motion.path
                                d={`M ${chartPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                                stroke="#e7ac08"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
                              />
                              
                              <motion.path
                                d={`M ${chartPoints[0].x},${chartPoints[0].y} L ${chartPoints.map(p => `${p.x},${p.y}`).join(' L ')} L ${chartPoints[chartPoints.length - 1].x},50 L ${chartPoints[0].x},50 Z`}
                                fill={`url(#gradient-${index})`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                              />
                            </svg>
                          </div>

                          {/* Coin Stats */}
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-[#aaa29d]">Market Cap</span>
                              <div className="text-[#fafaf9] font-semibold">
                                {coin.market_cap ? formatMarketCap(coin.market_cap) : 'Coming Soon'}
                              </div>
                            </div>
                            <div>
                              <span className="text-[#aaa29d]">Volume 24h</span>
                              <div className="text-[#fafaf9] font-semibold">
                                {coin.total_volume ? formatMarketCap(coin.total_volume) : 'TBD'}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default LiveDataPreviewSection