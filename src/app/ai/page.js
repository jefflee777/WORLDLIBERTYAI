'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTelegram, 
  FaTwitter, 
  FaCoins, 
  FaArrowRight,
  FaSearch,
  FaStar,
  FaRegStar,
  FaChartLine,
  FaBolt,
  FaRocket,
  FaEye,
  FaPaperPlane,
  FaSpinner,
  FaFilter,
  FaSort,
  FaBookmark,
  FaRegBookmark,
  FaTrendingUp,
  FaTrendingDown,
  FaFireAlt,
  FaGlobe
} from 'react-icons/fa'
import { 
  BiNetworkChart, 
  BiTrendingUp, 
  BiTrendingDown, 
  BiStats,
  BiRefresh,
  BiTime
} from 'react-icons/bi'
import { BsArrowRightCircle, BsChatDots, BsLightningCharge } from 'react-icons/bs'
import Image from 'next/image'

const WebAgent = () => {
  // Enhanced state management
  const [coinsData, setCoinsData] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])
  const [theme, setTheme] = useState('dark')
  const [favoriteCoins, setFavoriteCoins] = useState(['wlfi', 'bitcoin', 'ethereum'])
  const [watchlist, setWatchlist] = useState([])
  const [conversation, setConversation] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [activeCoin, setActiveCoin] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_rank')
  const [filterBy, setFilterBy] = useState('all')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [marketStats, setMarketStats] = useState({})
  const [activeTab, setActiveTab] = useState('coins')
  const [coinAlerts, setCoinAlerts] = useState({})

  const chatEndRef = useRef(null)
  const topCoinsRef = useRef(null)

  // Top 15 coins configuration
  const TOP_COINS = [
    'bitcoin', 'ethereum', 'binancecoin', 'ripple', 'cardano',
    'solana', 'polkadot', 'dogecoin', 'shiba-inu', 'polygon-ecosystem-token',
    'litecoin', 'tron', 'avalanche-2', 'chainlink', 'uniswap'
  ]

  // Load saved data from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('wlfi-theme')
    const savedFavorites = localStorage.getItem('wlfi-favorites')
    const savedWatchlist = localStorage.getItem('wlfi-watchlist')
    const savedConversation = localStorage.getItem('wlfi-conversation')
    const savedCoinsData = localStorage.getItem('wlfi-coins-data')
    const savedAlerts = localStorage.getItem('wlfi-alerts')

    if (savedTheme) setTheme(savedTheme)
    if (savedFavorites) setFavoriteCoins(JSON.parse(savedFavorites))
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist))
    if (savedConversation) setConversation(JSON.parse(savedConversation))
    if (savedCoinsData) {
      const data = JSON.parse(savedCoinsData)
      if (Date.now() - data.timestamp < 300000) { // 5 minutes cache
        setCoinsData(data.coins)
        setFilteredCoins(data.coins)
        setDataLoading(false)
      }
    }
    if (savedAlerts) setCoinAlerts(JSON.parse(savedAlerts))
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('wlfi-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('wlfi-favorites', JSON.stringify(favoriteCoins))
  }, [favoriteCoins])

  useEffect(() => {
    localStorage.setItem('wlfi-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    localStorage.setItem('wlfi-conversation', JSON.stringify(conversation))
  }, [conversation])

  useEffect(() => {
    localStorage.setItem('wlfi-alerts', JSON.stringify(coinAlerts))
  }, [coinAlerts])

  // Enhanced coin data fetching
  const fetchCoinData = async () => {
    setDataLoading(true)
    try {
      const coinIds = TOP_COINS.join(',')
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=1h,24h,7d,30d&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
      
      const response = await fetch(url)
      const data = await response.json()
      
      // Add WLFI as special coin
      const wlfiCoin = {
        id: 'wlfi',
        symbol: 'wlfi',
        name: 'World Liberty AI',
        image: '/logo.png',
        current_price: null,
        market_cap: null,
        market_cap_rank: null,
        fully_diluted_valuation: null,
        total_volume: null,
        high_24h: null,
        low_24h: null,
        price_change_24h: null,
        price_change_percentage_24h: null,
        price_change_percentage_7d_in_currency: null,
        price_change_percentage_30d_in_currency: null,
        market_cap_change_24h: null,
        market_cap_change_percentage_24h: null,
        circulating_supply: null,
        total_supply: 1000000000,
        max_supply: 1000000000,
        ath: null,
        ath_change_percentage: null,
        ath_date: null,
        atl: null,
        atl_change_percentage: null,
        atl_date: null,
        last_updated: new Date().toISOString(),
        sparkline_in_7d: { price: [] },
        coming_soon: true,
        description: "Revolutionary AI-powered financial intelligence platform launching soon. Join our community for exclusive updates!",
        special: true
      }

      const allCoins = [wlfiCoin, ...data]
      setCoinsData(allCoins)
      setFilteredCoins(allCoins)
      setLastUpdated(new Date())
      
      // Cache data
      localStorage.setItem('wlfi-coins-data', JSON.stringify({
        coins: allCoins,
        timestamp: Date.now()
      }))

      // Calculate market stats
      const totalMarketCap = data.reduce((sum, coin) => sum + (coin.market_cap || 0), 0)
      const totalVolume = data.reduce((sum, coin) => sum + (coin.total_volume || 0), 0)
      const avgChange24h = data.reduce((sum, coin) => sum + (coin.price_change_percentage_24h || 0), 0) / data.length
      
      setMarketStats({
        totalMarketCap,
        totalVolume,
        avgChange24h,
        coinsCount: data.length
      })
      
    } catch (error) {
      console.error('Error fetching coin data:', error)
    } finally {
      setDataLoading(false)
    }
  }

  // Enhanced filtering and sorting
  useEffect(() => {
    let filtered = coinsData.filter(coin => {
      if (showOnlyFavorites && !favoriteCoins.includes(coin.id)) return false
      if (searchQuery && !coin.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (filterBy === 'gainers' && coin.price_change_percentage_24h <= 0) return false
      if (filterBy === 'losers' && coin.price_change_percentage_24h >= 0) return false
      if (filterBy === 'watchlist' && !watchlist.includes(coin.id)) return false
      return true
    })

    // Sort filtered coins
    filtered.sort((a, b) => {
      if (a.special) return -1 // WLFI always first
      if (b.special) return 1
      
      switch (sortBy) {
        case 'market_cap_rank':
          return (a.market_cap_rank || 999) - (b.market_cap_rank || 999)
        case 'price':
          return (b.current_price || 0) - (a.current_price || 0)
        case 'change_24h':
          return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
        case 'volume':
          return (b.total_volume || 0) - (a.total_volume || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredCoins(filtered)
  }, [coinsData, searchQuery, sortBy, filterBy, showOnlyFavorites, favoriteCoins, watchlist])

  // Fetch data on mount and refresh every 2 minutes
  useEffect(() => {
    fetchCoinData()
    const interval = setInterval(fetchCoinData, 120000) // 2 minutes
    return () => clearInterval(interval)
  }, [])

  // Scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation, isTyping])

  // Enhanced chat with coin context
  const handleSendMessage = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      coinContext: activeCoin?.id || null
    }

    setConversation((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setIsTyping(true)

    try {
      let systemPrompt = `You are WLFI AI, World Liberty AI's advanced financial intelligence assistant. You specialize in:

🔹 BLOCKCHAIN ANALYTICS:
- Real-time transaction analysis
- Whale movement tracking  
- Market anomaly detection

🔹 CRYPTOCURRENCY INSIGHTS:
- Price analysis and predictions
- Technical indicators
- Market sentiment analysis

🔹 INVESTMENT GUIDANCE:
- Risk assessment
- Portfolio optimization
- Entry/exit strategies

GUIDELINES:
- Provide actionable, data-driven insights
- Use emojis for clarity and engagement
- Keep responses concise (max 200 words)
- Focus on transparency and factual analysis
- Never guarantee returns - always mention risks`

      if (activeCoin && !activeCoin.coming_soon) {
        systemPrompt += `

CURRENT COIN CONTEXT: ${activeCoin.name} (${activeCoin.symbol.toUpperCase()})
- Current Price: $${activeCoin.current_price?.toFixed(6) || 'N/A'}
- 24h Change: ${activeCoin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
- Market Cap Rank: ${activeCoin.market_cap_rank || 'N/A'}
- Market Cap: $${activeCoin.market_cap?.toLocaleString() || 'N/A'}
- Volume: $${activeCoin.total_volume?.toLocaleString() || 'N/A'}`
      }

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversation.slice(-5),
            userMessage,
          ]
        })
      })

      const data = await response.json()
      
      if (data.reply) {
        setConversation((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: data.reply, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            coinContext: activeCoin?.id || null
          }
        ])
      } else {
        throw new Error('No reply received')
      }
    } catch (error) {
      console.error('Chat error:', error)
      setConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "🔧 I'm experiencing technical difficulties. For comprehensive AI analysis, please visit our Telegram Mini App for full functionality!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsTyping(false)
      setLoading(false)
    }
  }

  // Coin selection with context
  const selectCoin = (coin) => {
    if (coin.coming_soon) {
      // For WLFI, redirect to Twitter
      window.open('https://twitter.com/worldlibertyai', '_blank')
      return
    }
    
    setActiveCoin(coin)
    setActiveTab('chat')
    
    // Add contextual greeting
    const contextMessage = {
      role: 'assistant',
      content: `📊 Now analyzing **${coin.name} (${coin.symbol.toUpperCase()})**

Current Price: **$${coin.current_price?.toFixed(6) || 'N/A'}**
24h Change: **${coin.price_change_percentage_24h >= 0 ? '📈' : '📉'} ${coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%**

What would you like to know about ${coin.name}? I can analyze:
• Price trends and patterns
• Market sentiment
• Technical indicators
• Investment potential
• Risk assessment`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      coinContext: coin.id,
      isContextual: true
    }
    
    setConversation(prev => [...prev, contextMessage])
    
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Toggle functions
  const toggleFavorite = (coinId) => {
    setFavoriteCoins(prev => {
      if (prev.includes(coinId)) {
        return prev.filter(id => id !== coinId)
      }
      return [...prev, coinId]
    })
  }

  const toggleWatchlist = (coinId) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) {
        return prev.filter(id => id !== coinId)
      }
      return [...prev, coinId]
    })
  }

  // Price alert system
  const setPriceAlert = (coinId, targetPrice, type) => {
    setCoinAlerts(prev => ({
      ...prev,
      [coinId]: { targetPrice, type, timestamp: Date.now() }
    }))
  }

  return (
    <div className="min-h-screen bg-[#171412] text-[#fafaf9] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(231, 172, 8, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(231, 172, 8, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-3xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(231, 172, 8, 0.3)",
                  "0 0 60px rgba(231, 172, 8, 0.6)",
                  "0 0 30px rgba(231, 172, 8, 0.3)",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <BiNetworkChart className="text-4xl text-[#171412]" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
                WLFI AI
              </h1>
              <p className="text-xl text-[#aaa29d] font-medium">Premium Web Agent</p>
            </div>
          </div>
          
          <p className="text-2xl text-[#d7d3d0] max-w-4xl mx-auto leading-relaxed mb-6">
            Advanced <span className="text-[#fdd949] font-medium">AI-powered cryptocurrency intelligence</span> with 
            real-time data, market analytics, and personalized insights.
          </p>
          
          {/* Market Stats */}
          {Object.keys(marketStats).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: 'Total Market Cap', value: `$${(marketStats.totalMarketCap / 1e12).toFixed(2)}T`, icon: FaCoins },
                { label: '24h Volume', value: `$${(marketStats.totalVolume / 1e9).toFixed(2)}B`, icon: BiStats },
                { label: 'Average Change', value: `${marketStats.avgChange24h.toFixed(2)}%`, icon: marketStats.avgChange24h >= 0 ? BiTrendingUp : BiTrendingDown },
                { label: 'Coins Tracked', value: marketStats.coinsCount, icon: FaEye }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-[#1c1917]/50 border border-[#44403c]/30 rounded-xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="text-[#e7ac08]" />
                    <span className="text-sm text-[#aaa29d]">{stat.label}</span>
                  </div>
                  <div className={`text-xl font-bold ${
                    stat.label === 'Average Change' 
                      ? marketStats.avgChange24h >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'
                      : 'text-[#ffffff]'
                  }`}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 mt-6 text-[#4ade80] text-sm">
              <motion.div 
                className="w-2 h-2 bg-[#4ade80] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Live • Last updated {lastUpdated.toLocaleTimeString()}</span>
              <motion.button
                onClick={fetchCoinData}
                className="ml-2 p-1 hover:bg-[#4ade80]/10 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={dataLoading}
              >
                <BiRefresh className={`text-[#4ade80] ${dataLoading ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-[#1c1917]/50 rounded-2xl p-2 border border-[#44403c]/30">
            {[
              { id: 'coins', label: 'Market Overview', icon: FaChartLine },
              { id: 'chat', label: 'AI Assistant', icon: BsChatDots, badge: activeCoin ? '1' : null }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 relative ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412]' 
                    : 'text-[#aaa29d] hover:text-[#fdd949]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="text-lg" />
                {tab.label}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f87171] text-[#ffffff] text-xs rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'coins' ? (
            <motion.div
              key="coins"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#aaa29d]" />
                  <input
                    type="text"
                    placeholder="Search coins by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#1c1917]/50 border border-[#44403c]/40 rounded-xl text-[#fafaf9] placeholder-[#aaa29d] focus:outline-none focus:ring-2 focus:ring-[#e7ac08]/50 focus:border-[#e7ac08]/60 transition-all duration-300"
                  />
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex gap-3">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-3 bg-[#1c1917]/50 border border-[#44403c]/40 rounded-xl text-[#fafaf9] focus:outline-none focus:ring-2 focus:ring-[#e7ac08]/50"
                  >
                    <option value="all">All Coins</option>
                    <option value="gainers">Gainers</option>
                    <option value="losers">Losers</option>
                    <option value="watchlist">Watchlist</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-[#1c1917]/50 border border-[#44403c]/40 rounded-xl text-[#fafaf9] focus:outline-none focus:ring-2 focus:ring-[#e7ac08]/50"
                  >
                    <option value="market_cap_rank">Market Cap</option>
                    <option value="price">Price</option>
                    <option value="change_24h">24h Change</option>
                    <option value="volume">Volume</option>
                    <option value="name">Name</option>
                  </select>

                  <motion.button
                    onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      showOnlyFavorites
                        ? 'bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412]'
                        : 'bg-[#1c1917]/50 border border-[#44403c]/40 text-[#aaa29d] hover:text-[#fdd949]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaStar />
                    Favorites
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Coin Grid */}
              {dataLoading ? (
                <div className="text-center py-20">
                  <FaSpinner className="text-6xl text-[#e7ac08] mx-auto mb-4 animate-spin" />
                  <p className="text-[#aaa29d] text-xl">Loading market data...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCoins.map((coin, index) => (
                    <motion.div
                      key={coin.id}
                      className="group relative bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 border border-[#44403c]/40 rounded-2xl p-6 backdrop-blur-sm hover:border-[#e7ac08]/60 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(231, 172, 8, 0.1)"
                      }}
                      onClick={() => selectCoin(coin)}
                    >
                      {/* Special Badge for WLFI */}
                      {coin.special && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] text-xs font-bold px-3 py-1 rounded-full">
                          COMING SOON
                        </div>
                      )}

                      {/* Coin Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                          {coin.special ? (
                                    <Image src="/logo.png" alt="logo" width={50} height={50} quality={100} className='scale-200'/>
                                ) : (
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        className="w-12 h-12 rounded-xl object-cover"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/48/e7ac08/171412?text=${coin.symbol.charAt(0).toUpperCase()}`;
                                        }}
                                    />
                                )}
                            {coin.market_cap_rank <= 10 && !coin.special && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#fdd949] text-[#171412] text-xs font-bold rounded-full flex items-center justify-center">
                                {coin.market_cap_rank}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#ffffff] group-hover:text-[#fdd949] transition-colors">
                              {coin.name}
                            </h3>
                            <p className="text-sm text-[#aaa29d] uppercase font-medium">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          {!coin.special && (
                            <>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(coin.id)
                                }}
                                className="text-[#e7ac08] hover:text-[#fdd949] transition-colors"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {favoriteCoins.includes(coin.id) ? <FaStar /> : <FaRegStar />}
                              </motion.button>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleWatchlist(coin.id)
                                }}
                                className="text-[#e7ac08] hover:text-[#fdd949] transition-colors"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {watchlist.includes(coin.id) ? <FaBookmark /> : <FaRegBookmark />}
                              </motion.button>
                            </>
                          )}
                        </div>
                      </div>

                      {coin.special ? (
                        /* WLFI Special Content */
                        <div className="space-y-4">
                          <p className="text-[#d7d3d0] leading-relaxed">
                            {coin.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-[#aaa29d]">Max Supply:</span>
                              <span className="text-[#ffffff] font-semibold">
                                {coin.max_supply?.toLocaleString()} WLFI
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#aaa29d]">Status:</span>
                              <span className="text-[#fdd949] font-semibold">Pre-Launch</span>
                            </div>
                          </div>
                          <motion.div
                            className="mt-4 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold py-3 px-4 rounded-xl text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <FaTwitter />
                              Join WLFI on X
                            </div>
                          </motion.div>
                        </div>
                      ) : (
                        /* Regular Coin Content */
                        <div className="space-y-4">
                          {/* Price Info */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl font-bold text-[#fdd949]">
                                ${coin.current_price?.toLocaleString(undefined, { 
                                  minimumFractionDigits: coin.current_price < 1 ? 6 : 2,
                                  maximumFractionDigits: coin.current_price < 1 ? 6 : 2 
                                }) || 'N/A'}
                              </span>
                              {coin.price_change_percentage_24h !== null && (
                                <span className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full ${
                                  coin.price_change_percentage_24h >= 0 
                                    ? 'text-[#4ade80] bg-[#4ade80]/10' 
                                    : 'text-[#f87171] bg-[#f87171]/10'
                                }`}>
                                  {coin.price_change_percentage_24h >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                                  {coin.price_change_percentage_24h.toFixed(2)}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-[#aaa29d]">Market Cap</span>
                              <div className="text-[#ffffff] font-semibold">
                                ${coin.market_cap ? (coin.market_cap / 1e9).toFixed(2) + 'B' : 'N/A'}
                              </div>
                            </div>
                            <div>
                              <span className="text-[#aaa29d]">Volume 24h</span>
                              <div className="text-[#ffffff] font-semibold">
                                ${coin.total_volume ? (coin.total_volume / 1e6).toFixed(1) + 'M' : 'N/A'}
                              </div>
                            </div>
                            <div>
                              <span className="text-[#aaa29d]">Rank</span>
                              <div className="text-[#ffffff] font-semibold">
                                #{coin.market_cap_rank || 'N/A'}
                              </div>
                            </div>
                            <div>
                              <span className="text-[#aaa29d]">7d Change</span>
                              <div className={`font-semibold ${
                                coin.price_change_percentage_7d_in_currency >= 0 
                                  ? 'text-[#4ade80]' : 'text-[#f87171]'
                              }`}>
                                {coin.price_change_percentage_7d_in_currency?.toFixed(1) || 'N/A'}%
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2 mt-4">
                            <motion.button
                              className="flex-1 bg-[#e7ac08]/10 border border-[#e7ac08]/30 text-[#e7ac08] py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#e7ac08]/20 transition-colors flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                selectCoin(coin)
                              }}
                            >
                              <BsChatDots />
                              Ask AI
                            </motion.button>
                            <motion.button
                              className="bg-[#1c1917]/50 border border-[#44403c]/40 text-[#aaa29d] p-2 rounded-lg hover:text-[#fdd949] hover:border-[#e7ac08]/40 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                // Add price alert functionality
                              }}
                            >
                              <FaBolt />
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#e7ac08]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredCoins.length === 0 && !dataLoading && (
                <div className="text-center py-20">
                  <FaSearch className="text-6xl text-[#aaa29d] mx-auto mb-4 opacity-50" />
                  <p className="text-[#aaa29d] text-xl">No coins found matching your criteria</p>
                </div>
              )}
            </motion.div>
          ) : (
            /* Enhanced Chat Interface */
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6 p-4 bg-[#1c1917]/50 border border-[#44403c]/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <BsChatDots className="text-[#e7ac08] text-2xl" />
                  <div>
                    <h2 className="text-2xl font-bold text-[#ffffff]">AI Assistant</h2>
                    {activeCoin ? (
                      <p className="text-[#aaa29d]">
                        Analyzing {activeCoin.name} ({activeCoin.symbol.toUpperCase()})
                      </p>
                    ) : (
                      <p className="text-[#aaa29d]">Ask me about any cryptocurrency</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#4ade80]/20 text-[#4ade80] text-sm rounded-full border border-[#4ade80]/30">
                    Preview Mode
                  </span>
                  {activeCoin && (
                    <motion.button
                      onClick={() => {
                        setActiveCoin(null)
                        setConversation(prev => prev.filter(msg => !msg.isContextual))
                      }}
                      className="text-[#aaa29d] hover:text-[#f87171] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-[#1c1917]/50 border border-[#44403c]/30 rounded-2xl p-6 mb-6 h-96 overflow-y-auto backdrop-blur-sm">
                {conversation.length === 0 ? (
                  <div className="text-center py-12">
                    <BiNetworkChart className="text-6xl text-[#e7ac08] mx-auto mb-4 opacity-50" />
                    <p className="text-[#aaa29d] text-lg mb-4">Welcome to WLFI AI Assistant</p>
                    <p className="text-[#aaa29d] text-sm mb-6">
                      I can help you analyze cryptocurrencies, understand market trends, and make informed decisions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                      {[
                        'Analyze Bitcoin price trends',
                        'Compare ETH vs other altcoins',
                        'Explain market volatility',
                        'Investment risk assessment'
                      ].map((suggestion, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setInput(suggestion)}
                          className="p-3 bg-[#171412]/50 border border-[#44403c]/30 rounded-lg text-sm text-[#aaa29d] hover:text-[#fdd949] hover:border-[#e7ac08]/40 transition-all duration-300 text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          💡 {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {conversation.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <div className={`max-w-[80%] p-4 rounded-2xl relative ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412]' 
                            : msg.isContextual
                            ? 'bg-gradient-to-r from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 text-[#fafaf9]'
                            : 'bg-[#171412]/70 text-[#fafaf9] border border-[#44403c]/30'
                        }`}>
                          {msg.coinContext && !msg.isContextual && (
                            <div className="text-xs mb-2 opacity-70 flex items-center gap-1">
                              <FaCoins />
                              {coinsData.find(c => c.id === msg.coinContext)?.name}
                            </div>
                          )}
                          <div className="whitespace-pre-line leading-relaxed">
                            {msg.content}
                          </div>
                          <div className={`text-xs mt-2 opacity-70 ${
                            msg.role === 'user' ? 'text-[#171412]' : 'text-[#aaa29d]'
                          }`}>
                            {msg.timestamp}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-[#171412]/70 border border-[#44403c]/30 p-4 rounded-2xl flex items-center gap-2">
                          <FaSpinner className="animate-spin text-[#e7ac08]" />
                          <span className="text-[#aaa29d]">WLFI AI is analyzing...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Enhanced Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      activeCoin 
                        ? `Ask about ${activeCoin.name}...` 
                        : "Ask WLFI AI about crypto markets, trends, or specific coins..."
                    }
                    className="w-full pl-4 pr-12 py-4 bg-[#1c1917]/50 border border-[#44403c]/40 rounded-xl text-[#fafaf9] placeholder-[#aaa29d] focus:outline-none focus:ring-2 focus:ring-[#e7ac08]/50 focus:border-[#e7ac08]/60 transition-all duration-300"
                    disabled={loading}
                  />
                  {input && (
                    <motion.button
                      type="button"
                      onClick={() => setInput('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#aaa29d] hover:text-[#f87171] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send
                    </>
                  )}
                </motion.button>
              </form>

              {/* Quick Actions */}
              {!loading && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    'What are today\'s top gainers?',
                    'Explain DeFi trends',
                    'Should I buy Bitcoin now?',
                    'Compare Layer 1 blockchains'
                  ].map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-2 bg-[#1c1917]/30 border border-[#44403c]/20 text-[#aaa29d] text-sm rounded-lg hover:text-[#fdd949] hover:border-[#e7ac08]/40 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CTA Section */}
        <motion.section
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 rounded-3xl backdrop-blur-sm">
            <div className="mb-8">
              <FaRocket className="text-5xl text-[#e7ac08] mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                Ready for Advanced AI Intelligence?
              </h3>
              <p className="text-[#aaa29d] leading-relaxed text-lg mb-6">
                Unlock the full power of WLFI AI with our Telegram Mini App. Get real-time blockchain analytics, 
                whale tracking, portfolio optimization, and advanced market intelligence.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: FaEye, title: 'Whale Tracking', desc: 'Monitor large transactions and wallet movements' },
                  { icon: BiStats, title: 'Portfolio Analytics', desc: 'Advanced performance tracking and insights' },
                  { icon: FaBolt, title: 'Real-time Alerts', desc: 'Instant notifications for market opportunities' }
                ].map((feature, index) => (
                  <div key={index} className="text-center p-4">
                    <feature.icon className="text-3xl text-[#e7ac08] mx-auto mb-3" />
                    <h4 className="text-[#ffffff] font-semibold mb-2">{feature.title}</h4>
                    <p className="text-[#aaa29d] text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://t.me/worldlibertyai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(231, 172, 8, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTelegram className="text-xl" />
                Launch Full WLFI AI
                <BsArrowRightCircle className="text-lg group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="https://twitter.com/worldlibertyai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1c1917]/50 border border-[#44403c]/50 text-[#fafaf9] font-medium rounded-xl hover:border-[#e7ac08]/60 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTwitter className="text-xl" />
                Follow Updates
              </motion.a>
              
              <motion.button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1c1917]/50 border border-[#44403c]/50 text-[#fafaf9] font-medium rounded-xl hover:border-[#e7ac08]/60 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BiRefresh className="text-xl" />
                Refresh Data
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default WebAgent
