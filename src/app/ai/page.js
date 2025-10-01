'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTelegram, 
  FaCoins, 
  FaSearch, 
  FaStar, 
  FaRegStar, 
  FaChartLine, 
  FaBolt, 
  FaEye, 
  FaPaperPlane, 
  FaSpinner, 
  FaBookmark, 
  FaRegBookmark 
} from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { BiNetworkChart, BiTrendingUp, BiTrendingDown, BiStats, BiRefresh } from 'react-icons/bi'
import { BsArrowRightCircle, BsChatDots, BsLightningCharge } from 'react-icons/bs'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

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
        id: 'wlfiai',
        symbol: 'wlfiai',
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
      let systemPrompt = `You are WLFIAI AI, World Liberty AI's advanced financial intelligence assistant. You specialize in:

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

**Current Price:** $${coin.current_price?.toFixed(6) || 'N/A'}
**24h Change:** ${coin.price_change_percentage_24h >= 0 ? '📈' : '📉'} ${coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%

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
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-[#2E2E2E] sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/navlogo.png" alt="WLFI AI" width={100} height={100} />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#39FF14]">
                WLFIAI</h1>
                <p className="text-sm text-[#AAAAAA] hidden sm:block">
                  Advanced AI-powered cryptocurrency intelligence with real-time data, market analytics, and personalized insights.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => fetchCoinData()}
                disabled={dataLoading}
                className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg text-[#39FF14] hover:border-[#39FF14] transition-colors duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BiRefresh className={dataLoading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
              
              <motion.a
                href="https://t.me/WLFIai_bot/live"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-[#000000] rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegram />
                <span className="hidden sm:inline">Mini App</span>
              </motion.a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel - Coins */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-[#0D0D0D] border border-[#2E2E2E] rounded-xl p-6">
              
              {/* Market Stats */}
              {Object.keys(marketStats).length > 0 && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2E2E2E]">
                    <div className="text-[#39FF14] text-lg font-bold">
                      ${(marketStats.totalMarketCap / 1e12).toFixed(2)}T
                    </div>
                    <div className="text-[#AAAAAA] text-xs">Total Cap</div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2E2E2E]">
                    <div className="text-[#39FF14] text-lg font-bold">
                      ${(marketStats.totalVolume / 1e9).toFixed(1)}B
                    </div>
                    <div className="text-[#AAAAAA] text-xs">24h Volume</div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2E2E2E]">
                    <div className={`text-lg font-bold ${marketStats.avgChange24h >= 0 ? 'text-[#39FF14]' : 'text-[#FF4444]'}`}>
                      {marketStats.avgChange24h >= 0 ? '+' : ''}{marketStats.avgChange24h.toFixed(1)}%
                    </div>
                    <div className="text-[#AAAAAA] text-xs">24h Change</div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2E2E2E]">
                    <div className="text-[#39FF14] text-lg font-bold">{marketStats.coinsCount}</div>
                    <div className="text-[#AAAAAA] text-xs">Coins</div>
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA]" />
                  <input
                    type="text"
                    placeholder="Search coins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg text-[#FFFFFF] placeholder-[#AAAAAA] focus:border-[#39FF14] focus:outline-none transition-colors duration-300"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg text-[#FFFFFF] focus:border-[#39FF14] focus:outline-none transition-colors duration-300"
                  >
                    <option value="market_cap_rank">Rank</option>
                    <option value="price">Price</option>
                    <option value="change_24h">24h %</option>
                    <option value="volume">Volume</option>
                    <option value="name">Name</option>
                  </select>
                  
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg text-[#FFFFFF] focus:border-[#39FF14] focus:outline-none transition-colors duration-300"
                  >
                    <option value="all">All Coins</option>
                    <option value="gainers">Gainers</option>
                    <option value="losers">Losers</option>
                    <option value="watchlist">Watchlist</option>
                  </select>
                </div>
              </div>

              {/* Coins Grid */}
              {dataLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-[#39FF14] mb-4 mx-auto" />
                    <p className="text-[#AAAAAA]">Loading market data...</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredCoins.map((coin, index) => (
                    <motion.div
                      key={coin.id}
                      className={`bg-[#1A1A1A] border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#39FF14] ${
                        coin.special ? 'border-[#39FF14] bg-gradient-to-br from-[#39FF14]/10 to-[#1A1A1A]' : 'border-[#2E2E2E]'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => selectCoin(coin)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                              onError={(e) => {
                                e.target.src = '/logo.png'
                              }}
                            />
                            {coin.coming_soon && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39FF14] rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-[#FFFFFF] text-sm">{coin.name}</h3>
                            <p className="text-[#AAAAAA] text-xs uppercase">{coin.symbol}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(coin.id)
                            }}
                            className="text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
                          >
                            {favoriteCoins.includes(coin.id) ? <FaStar className="text-[#39FF14]" /> : <FaRegStar />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleWatchlist(coin.id)
                            }}
                            className="text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
                          >
                            {watchlist.includes(coin.id) ? <FaBookmark className="text-[#39FF14]" /> : <FaRegBookmark />}
                          </button>
                        </div>
                      </div>

                      {coin.coming_soon ? (
                        <div className="text-center py-3">
                          <div className="text-[#39FF14] font-bold mb-1">Coming Soon</div>
                          <div className="text-[#AAAAAA] text-xs">{coin.description}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-[#FFFFFF] font-bold">
                              ${coin.current_price?.toLocaleString() || 'N/A'}
                            </div>
                            {coin.price_change_percentage_24h !== null && (
                              <div className={`flex items-center gap-1 text-sm font-medium ${
                                coin.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-[#FF4444]'
                              }`}>
                                {coin.price_change_percentage_24h >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                                {coin.price_change_percentage_24h.toFixed(2)}%
                              </div>
                            )}
                          </div>
                          
                          <div className="text-[#AAAAAA] text-xs space-y-1">
                            <div className="flex justify-between">
                              <span>Rank:</span>
                              <span>#{coin.market_cap_rank || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Market Cap:</span>
                              <span>${coin.market_cap ? (coin.market_cap / 1e9).toFixed(2) + 'B' : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Volume:</span>
                              <span>${coin.total_volume ? (coin.total_volume / 1e6).toFixed(1) + 'M' : 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {!dataLoading && filteredCoins.length === 0 && (
                <div className="text-center py-20">
                  <FaCoins className="text-6xl text-[#2E2E2E] mb-4 mx-auto" />
                  <p className="text-[#AAAAAA]">No coins found matching your criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="bg-[#0D0D0D] border border-[#2E2E2E] rounded-xl overflow-hidden sticky top-24">
              {/* Chat Header */}
              <div className="p-4 border-b border-[#2E2E2E] bg-[#1A1A1A]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#FFFFFF]">
                      {activeCoin ? (
                        `Analyzing ${activeCoin.name} (${activeCoin.symbol.toUpperCase()})`
                      ) : (
                        'Ask me about any cryptocurrency'
                      )}
                    </h3>
                    <p className="text-[#AAAAAA] text-xs">AI-powered market intelligence</p>
                  </div>
                  <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {conversation.length === 0 && (
                  <div className="text-center py-8">
                    <BsChatDots className="text-4xl text-[#39FF14] mb-4 mx-auto" />
                    <h4 className="font-bold text-[#FFFFFF] mb-2">Welcome to WLFIAI AI Assistant</h4>
                    <p className="text-[#AAAAAA] text-sm mb-4">
                      I can help you analyze cryptocurrencies, understand market trends, and make informed decisions.
                    </p>
                    <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg p-4 text-left">
                      <h5 className="font-medium text-[#39FF14] mb-2">Try asking:</h5>
                      <ul className="text-[#AAAAAA] text-sm space-y-1">
                        <li>• "What's the outlook for Bitcoin?"</li>
                        <li>• "Analyze Ethereum's recent performance"</li>
                        <li>• "Should I buy or sell this coin?"</li>
                      </ul>
                    </div>
                  </div>
                )}

                {conversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`max-w-[85%] p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-[#39FF14] text-[#000000]' 
                        : 'bg-[#1A1A1A] border border-[#2E2E2E] text-[#FFFFFF]'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown 
                          // className="text-sm leading-relaxed"
                          components={{
                            p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({children}) => <strong className="text-[#39FF14] font-semibold">{children}</strong>,
                            ul: ({children}) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                            li: ({children}) => <li className="text-sm">{children}</li>,
                            code: ({children}) => <code className="bg-[#000000] px-1 py-0.5 rounded text-[#39FF14] text-xs">{children}</code>
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <div className="text-sm">{msg.content}</div>
                      )}
                      <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-[#000000]/70' : 'text-[#AAAAAA]'}`}>
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
                    <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaSpinner className="animate-spin text-[#39FF14]" />
                        <span className="text-[#AAAAAA] text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#2E2E2E]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about cryptocurrency analysis..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg text-[#FFFFFF] placeholder-[#AAAAAA] focus:border-[#39FF14] focus:outline-none transition-colors duration-300 disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-4 py-3 bg-[#39FF14] text-[#000000] rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!loading && input.trim() ? { scale: 1.05 } : {}}
                    whileTap={!loading && input.trim() ? { scale: 0.95 } : {}}
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-[#0D0D0D] border border-[#39FF14]/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-balance font-bold text-[#FFFFFF] mb-4">
            Ready for Advanced AI Intelligence?
            </h2>
            <p className="text-[#AAAAAA] text-balance mb-8 max-w-2xl mx-auto">
            Unlock the full power of WLFIAI AI with our Telegram Mini App. Get real-time blockchain analytics, whale tracking, portfolio optimization, and advanced market intelligence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: FaBolt, title: "Real-time Analytics", desc: "Live blockchain data analysis" },
                { icon: FaEye, title: "Whale Tracking", desc: "Monitor large transactions" },
                { icon: BiStats, title: "Portfolio Optimization", desc: "AI-powered investment strategies" }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="text-3xl text-[#39FF14] mb-3 mx-auto" />
                  <h3 className="font-semibold text-[#FFFFFF] mb-2">{feature.title}</h3>
                  <p className="text-[#AAAAAA] text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://t.me/WLFIai_bot/live"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#39FF14] to-[#B3FF66] text-[#000000] rounded-xl font-bold text-lg hover:opacity-90 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegram className="text-xl" />
                Launch Mini App
              </motion.a>
              
              <motion.a
                href="https://twitter.com/worldlibertyai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] border border-[#2E2E2E] text-[#FFFFFF] rounded-xl font-medium hover:border-[#39FF14] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BsTwitterX className="text-lg" />
                Follow Updates
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WebAgent
