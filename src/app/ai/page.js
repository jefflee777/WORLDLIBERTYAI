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
  FaSpinner
} from 'react-icons/fa'
import { BiNetworkChart, BiTrendingUp, BiTrendingDown } from 'react-icons/bi'
import { BsArrowRightCircle, BsChatDots } from 'react-icons/bs'

const WebAgent = () => {
  // State management
  const [theme, setTheme] = useState('dark')
  const [favoriteCoins, setFavoriteCoins] = useState(['WLFI', 'BTC', 'ETH'])
  const [summaries, setSummaries] = useState({})
  const [coinPrices, setCoinPrices] = useState({})
  const [input, setInput] = useState('')
  const [conversation, setConversation] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [lastUpdated, setLastUpdated] = useState(null)

  const chatEndRef = useRef(null)

  // Default coin data with AI summaries
  const defaultSummaries = {
    'WLFI': {
      name: 'World Liberty AI',
      summary: 'Revolutionary AI-powered financial intelligence platform. Strong fundamentals with growing institutional adoption. Bullish outlook with innovative blockchain analytics.',
      trend: 'bullish',
      change: '+5.2%',
      analysis: 'AI market intelligence leader with transparent tokenomics'
    },
    'BTC': {
      name: 'Bitcoin',
      summary: 'Digital gold maintaining strong support levels. Institutional demand continues with ETF inflows. Long-term bullish despite short-term volatility.',
      trend: 'bullish',
      change: '+2.1%',
      analysis: 'Store of value narrative strengthening amid global uncertainty'
    },
    'ETH': {
      name: 'Ethereum',
      summary: 'Leading smart contract platform with strong DeFi ecosystem. Upgrade improvements show positive network effects. Moderate bullish sentiment.',
      trend: 'bullish',
      change: '+1.8%',
      analysis: 'Layer 2 scaling and staking rewards driving utility'
    }
  }

  // Load from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('wlfi-theme')
    const storedFavs = localStorage.getItem('wlfi-favorites')
    const storedSummaries = localStorage.getItem('wlfi-summaries')
    const storedConv = localStorage.getItem('wlfi-conversation')
    const storedPrices = localStorage.getItem('wlfi-prices')

    if (storedTheme) setTheme(storedTheme)
    if (storedFavs) setFavoriteCoins(JSON.parse(storedFavs))
    if (storedSummaries) {
      setSummaries(JSON.parse(storedSummaries))
    } else {
      setSummaries(defaultSummaries)
    }
    if (storedConv) setConversation(JSON.parse(storedConv))
    if (storedPrices) setCoinPrices(JSON.parse(storedPrices))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('wlfi-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('wlfi-favorites', JSON.stringify(favoriteCoins))
  }, [favoriteCoins])

  useEffect(() => {
    localStorage.setItem('wlfi-summaries', JSON.stringify(summaries))
  }, [summaries])

  useEffect(() => {
    localStorage.setItem('wlfi-conversation', JSON.stringify(conversation))
  }, [conversation])

  useEffect(() => {
    localStorage.setItem('wlfi-prices', JSON.stringify(coinPrices))
  }, [coinPrices])

  // Fetch coin prices from free API
  const fetchCoinPrices = async () => {
    try {
      const coinIds = {
        'BTC': 'bitcoin',
        'ETH': 'ethereum',
        'WLFI': 'bitcoin'
      }
      
      const ids = Object.values(coinIds).join(',')
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      )
      
      if (response.ok) {
        const data = await response.json()
        const prices = {}
        
        Object.entries(coinIds).forEach(([symbol, id]) => {
          if (data[id]) {
            prices[symbol] = {
              price: data[id].usd,
              change: data[id].usd_24h_change || 0
            }
          }
        })
        
        // Mock WLFI price
        prices['WLFI'] = {
          price: 4.27,
          change: 5.2
        }
        
        setCoinPrices(prices)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }

  // Fetch prices on mount and every 30 seconds
  useEffect(() => {
    fetchCoinPrices()
    const interval = setInterval(fetchCoinPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation, isTyping])

  // Handle chat messages
  const handleSendMessage = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setConversation((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { 
              role: 'system', 
              content: `You are WLFI AI, World Liberty AI's financial intelligence assistant. You specialize in:

🔹 BLOCKCHAIN ANALYTICS:
- Real-time transaction analysis
- Whale movement tracking
- Market anomaly detection

🔹 MARKET INTELLIGENCE:
- Cryptocurrency price analysis
- Trend identification
- Risk assessment

🔹 AI-POWERED INSIGHTS:
- Pattern recognition
- Predictive analytics
- Investment guidance

GUIDELINES:
- Provide actionable financial insights
- Use emojis for clarity
- Keep responses concise (max 150 words)
- Focus on transparency and data-driven analysis
- Never guarantee returns or give definitive financial advice` 
            },
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
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
          content: "🔧 I'm experiencing technical difficulties. For full AI analysis, please use our Telegram Mini App!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsTyping(false)
      setLoading(false)
    }
  }

  // Toggle favorite coin
  const toggleFavorite = (coin) => {
    setFavoriteCoins(prev => {
      if (prev.includes(coin)) {
        return prev.filter(fav => fav !== coin)
      }
      return [...prev, coin]
    })
  }

  // Quick coin search
  const handleQuickSearch = (coinSymbol) => {
    const coin = coinSymbol.toUpperCase()
    if (summaries[coin]) {
      setSearchResult({
        coin,
        ...summaries[coin],
        price: coinPrices[coin]
      })
    } else {
      setSearchResult(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#171412] text-[#fafaf9] overflow-hidden">
      {/* Background Pattern */}
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
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-[#e7ac08] to-[#fdd949] rounded-2xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(231, 172, 8, 0.3)",
                  "0 0 40px rgba(231, 172, 8, 0.6)",
                  "0 0 20px rgba(231, 172, 8, 0.3)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BiNetworkChart className="text-3xl text-[#171412]" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7ac08] to-[#fdd949]">
                WLFI AI
              </h1>
              <p className="text-lg text-[#aaa29d] font-medium">Web Agent</p>
            </div>
          </div>
          
          <p className="text-xl text-[#d7d3d0] max-w-3xl mx-auto leading-relaxed">
            Your gateway to <span className="text-[#fdd949] font-medium">AI-powered financial intelligence</span>. 
            Get instant insights, track market trends, and discover opportunities.
          </p>
          
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 mt-4 text-[#4ade80] text-sm">
              <motion.div 
                className="w-2 h-2 bg-[#4ade80] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Live data • Updated {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-[#1c1917]/50 rounded-2xl p-2 border border-[#44403c]/30">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
              { id: 'chat', label: 'AI Chat', icon: BsChatDots }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412]' 
                    : 'text-[#aaa29d] hover:text-[#fdd949]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="text-lg" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quick Coin Insights */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <FaEye className="text-[#e7ac08] text-xl" />
                  <h2 className="text-2xl font-bold text-[#ffffff]">Market Intelligence</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCoins.map((coin, index) => {
                    const coinData = summaries[coin]
                    const priceData = coinPrices[coin]
                    
                    return (
                      <motion.div
                        key={coin}
                        className="group relative p-6 bg-gradient-to-br from-[#1c1917]/60 to-[#171412]/40 border border-[#44403c]/40 rounded-2xl backdrop-blur-sm hover:border-[#e7ac08]/60 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          y: -5,
                          boxShadow: "0 20px 40px rgba(231, 172, 8, 0.1)"
                        }}
                        onClick={() => handleQuickSearch(coin)}
                      >
                        {/* Favorite Star */}
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(coin)
                          }}
                          className="absolute top-4 right-4 text-[#e7ac08] hover:text-[#fdd949] transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaStar className="text-lg" />
                        </motion.button>

                        {/* Coin Header */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-[#ffffff] mb-1">{coin}</h3>
                          <p className="text-[#aaa29d] text-sm">{coinData?.name || 'Unknown'}</p>
                        </div>

                        {/* Price Info */}
                        {priceData && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl font-bold text-[#fdd949]">
                                ${priceData.price?.toFixed(2) || 'N/A'}
                              </span>
                              {priceData.change && (
                                <span className={`flex items-center gap-1 text-sm font-medium ${
                                  priceData.change >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'
                                }`}>
                                  {priceData.change >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                                  {priceData.change >= 0 ? '+' : ''}{priceData.change.toFixed(2)}%
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* AI Summary */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <FaBolt className="text-[#e7ac08] text-sm" />
                            <span className="text-sm font-medium text-[#ffffff]">AI Analysis</span>
                          </div>
                          <p className="text-[#aaa29d] text-sm leading-relaxed">
                            {coinData?.summary || 'AI analysis loading...'}
                          </p>
                          {coinData?.trend && (
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              coinData.trend === 'bullish' 
                                ? 'bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/30' 
                                : coinData.trend === 'bearish'
                                ? 'bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30'
                                : 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30'
                            }`}>
                              {coinData.trend.charAt(0).toUpperCase() + coinData.trend.slice(1)}
                            </span>
                          )}
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e7ac08]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                      </motion.div>
                    )
                  })}
                </div>
              </section>

              {/* Search Result */}
              {searchResult && (
                <motion.section
                  className="mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-6 bg-gradient-to-br from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 rounded-2xl">
                    <h3 className="text-xl font-bold text-[#ffffff] mb-4 flex items-center gap-2">
                      <FaSearch className="text-[#e7ac08]" />
                      Search Result: {searchResult.coin}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#fdd949] mb-2">AI Summary</h4>
                        <p className="text-[#d7d3d0] leading-relaxed">{searchResult.summary}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#fdd949] mb-2">Quick Analysis</h4>
                        <p className="text-[#d7d3d0] leading-relaxed">{searchResult.analysis}</p>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Chat Interface */}
              <section className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <BsChatDots className="text-[#e7ac08] text-xl" />
                  <h2 className="text-2xl font-bold text-[#ffffff]">AI Assistant</h2>
                  <span className="px-3 py-1 bg-[#4ade80]/20 text-[#4ade80] text-sm rounded-full border border-[#4ade80]/30">
                    Preview Mode
                  </span>
                </div>

                {/* Chat Messages */}
                <div className="bg-[#1c1917]/50 border border-[#44403c]/30 rounded-2xl p-6 mb-6 h-96 overflow-y-auto backdrop-blur-sm">
                  {conversation.length === 0 ? (
                    <div className="text-center py-12">
                      <BiNetworkChart className="text-6xl text-[#e7ac08] mx-auto mb-4 opacity-50" />
                      <p className="text-[#aaa29d] text-lg mb-2">Welcome to WLFI AI Assistant</p>
                      <p className="text-[#aaa29d] text-sm">Ask me about cryptocurrencies, market trends, or blockchain analytics</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {conversation.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.role === 'user' 
                              ? 'bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412]' 
                              : 'bg-[#171412]/70 text-[#fafaf9] border border-[#44403c]/30'
                          }`}>
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
                          <div className="bg-[#171412]/70 border border-[#44403c]/30 p-4 rounded-2xl">
                            <div className="flex items-center gap-2">
                              <FaSpinner className="animate-spin text-[#e7ac08]" />
                              <span className="text-[#aaa29d]">WLFI AI is thinking...</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask WLFI AI about markets, trends, or specific coins..."
                      className="w-full p-4 bg-[#1c1917]/50 border border-[#44403c]/40 rounded-xl text-[#fafaf9] placeholder-[#aaa29d] focus:outline-none focus:ring-2 focus:ring-[#e7ac08]/50 focus:border-[#e7ac08]/60 transition-all duration-300"
                      disabled={loading}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaPaperPlane />
                    )}
                    Send
                  </motion.button>
                </form>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini App CTA */}
        <motion.section
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[#e7ac08]/10 to-[#fdd949]/10 border border-[#e7ac08]/30 rounded-3xl backdrop-blur-sm">
            <div className="mb-6">
              <FaRocket className="text-4xl text-[#e7ac08] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffffff] mb-3">
                Ready for Full AI Power?
              </h3>
              <p className="text-[#aaa29d] leading-relaxed">
                Get real-time blockchain analytics, whale tracking, and advanced market intelligence with our Telegram Mini App.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://t.me/worldlibertyai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#e7ac08] to-[#fdd949] text-[#171412] font-bold rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(231, 172, 8, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTelegram className="text-xl" />
                Launch WLFI AI Bot
                <BsArrowRightCircle className="text-lg group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="https://twitter.com/worldlibertyai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-[#1c1917]/50 border border-[#44403c]/50 text-[#fafaf9] font-medium rounded-xl hover:border-[#e7ac08]/60 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTwitter className="text-xl" />
                Follow Updates
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default WebAgent
