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
        
        // API call to get USD1 data
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
            image: 'https://via.placeholder.com/64/39FF14/000000?text=WLFI',
            current_price: 0.0034,
            price_change_percentage_24h: 12.45,
            price_change_percentage_7d: 28.67,
            market_cap: 3400000000,
            total_volume: 125000000,
            sparkline_in_7d: {
              price: [0.0028, 0.0031, 0.0029, 0.0032, 0.0035, 0.0033, 0.0034, 0.0036, 0.0038, 0.0040, 0.0042, 0.0039, 0.0037, 0.0041, 0.0043]
            }
          },
          {
            id: 'usd1-wlfi',
            symbol: 'usd1',
            name: 'USD1',
            image: 'https://via.placeholder.com/64/00E0FF/000000?text=USD1',
            current_price: 1.00,
            price_change_percentage_24h: 0.02,
            price_change_percentage_7d: 0.01,
            market_cap: 32000000000,
            total_volume: 4200000000,
            sparkline_in_7d: {
              price: [0.999, 1.001, 1.000, 0.999, 1.001, 1.000, 1.000, 0.998, 1.002, 1.001, 0.999, 1.000, 1.001, 0.999, 1.000]
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

  // Generate enhanced chart points for bigger, cleaner charts
  const generateChartPoints = (sparklineData) => {
    if (!sparklineData || !sparklineData.length) {
      // Generate more points for smoother curve
      return Array.from({ length: 20 }, (_, i) => ({
        x: 20 + (i * 320 / 19),
        y: 60 + Math.sin(i * 0.5) * 20 + Math.cos(i * 0.3) * 10
      }))
    }
    
    const minPrice = Math.min(...sparklineData)
    const maxPrice = Math.max(...sparklineData)
    const range = maxPrice - minPrice || 1
    
    // Create more chart points with better spacing for larger charts
    return sparklineData.map((price, index) => ({
      x: 20 + (index * 320 / (sparklineData.length - 1)),
      y: 100 - ((price - minPrice) / range * 60)
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
      className="relative py-24 overflow-hidden"
    >
      {/* Clean Futuristic Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(57, 255, 20, 0.05) 0%, rgba(13, 13, 13, 1) 25%, rgba(0, 0, 0, 1) 100%),
            radial-gradient(circle at 20% 30%, rgba(57, 255, 20, 0.03) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Subtle Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#39FF14]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
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
                <div className="h-[3px] bg-gradient-to-r from-[#39FF14] to-[#B3FF66] rounded-full" />
              </motion.div>
              
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-[#FFFFFF] block">Track WLFI</span>
                <span className="text-[#39FF14]">
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
              <p className="text-xl text-[#E5E5E5] leading-relaxed">
                Real-time intelligence for{' '}
                <span className="text-[#39FF14] font-medium">World Liberty Financial & USD1</span> tokens.
              </p>
              
              <p className="text-lg text-[#AAAAAA] leading-relaxed">
                From whale movements to price predictions, stay ahead with live market intelligence.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="p-4 bg-[#1A1A1A]/60 border border-[#2E2E2E] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaEye className="text-[#39FF14]" />
                  <span className="text-sm text-[#AAAAAA]">Monitoring</span>
                </div>
                <div className="text-2xl font-bold text-[#FFFFFF]">24/7</div>
              </div>
              
              <div className="p-4 bg-[#1A1A1A]/60 border border-[#2E2E2E] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaBolt className="text-[#39FF14]" />
                  <span className="text-sm text-[#AAAAAA]">Tokens</span>
                </div>
                <div className="text-2xl font-bold text-[#FFFFFF]">{wlfiCoins.length}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Data Visualization - Larger Charts */}
          <motion.div 
            className="lg:col-span-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              
              {/* Enhanced WLFI Coins Display */}
              <motion.div
                className="relative overflow-hidden p-6 bg-[#0D0D0D]/90 backdrop-blur-sm border border-[#2E2E2E] rounded-2xl"
                whileHover={{ 
                  borderColor: "#39FF14",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-[#39FF14] text-xl" />
                    <div>
                      <h3 className="text-xl font-semibold text-[#FFFFFF]">Live Market Data</h3>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 bg-[#39FF14] rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[#39FF14] text-sm font-medium">Real-time Updates</span>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <motion.div 
                      className="w-8 h-8 border-2 border-[#2E2E2E] border-t-[#39FF14] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="ml-3 text-[#39FF14]">Loading market data...</span>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {wlfiCoins.map((coin, index) => {
                      const chartPoints = generateChartPoints(coin.sparkline_in_7d?.price)
                      
                      return (
                        <motion.div
                          key={coin.id}
                          className="p-6 bg-[#1A1A1A]/80 border border-[#2E2E2E] rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ borderColor: "#39FF14" }}
                        >
                          {/* Coin Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img 
                                  src={coin.image} 
                                  alt={coin.name}
                                  className="w-12 h-12 rounded-full border-2 border-[#2E2E2E]"
                                  onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/48/39FF14/000000?text=${coin.symbol.charAt(0).toUpperCase()}`
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="text-[#FFFFFF] font-bold text-lg">
                                  {coin.name}
                                </h4>
                                <p className="text-[#AAAAAA] text-sm font-medium">{coin.symbol.toUpperCase()}</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <motion.div 
                                className="text-3xl font-bold text-[#39FF14]"
                                key={coin.current_price}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {formatPrice(coin.current_price)}
                              </motion.div>
                              {coin.price_change_percentage_24h !== null && (
                                <div className={`flex items-center gap-2 text-sm font-medium justify-end ${
                                  coin.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-[#FF4444]'
                                }`}>
                                  {coin.price_change_percentage_24h >= 0 ? 
                                    <BiTrendingUp className="text-lg" /> : <BiTrendingDown className="text-lg" />
                                  }
                                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Enhanced Stats Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-[#000000]/40 border border-[#2E2E2E] rounded-lg">
                              <div className="text-xs text-[#AAAAAA] mb-1">Market Cap</div>
                              <div className="text-sm font-bold text-[#FFFFFF]">
                                {coin.market_cap ? formatMarketCap(coin.market_cap) : 'N/A'}
                              </div>
                            </div>
                            <div className="p-3 bg-[#000000]/40 border border-[#2E2E2E] rounded-lg">
                              <div className="text-xs text-[#AAAAAA] mb-1">Volume 24h</div>
                              <div className="text-sm font-bold text-[#FFFFFF]">
                                {coin.total_volume ? formatMarketCap(coin.total_volume) : 'N/A'}
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
