'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, 
  FaPaperPlane, 
  FaSpinner, 
  FaLayerGroup,
  FaGlobeAmericas,
  FaWallet,
  FaBolt,
  FaRobot,
  FaChartLine,
  FaShieldAlt,
  FaExchangeAlt,
  FaFireAlt,
  FaUsers,
  FaHistory,
  FaBell
} from 'react-icons/fa'
import { 
  BsTerminal, 
  BsLightningChargeFill, 
  BsCpu,
  BsStars,
  BsGpuCard,
  BsBarChartFill,
  BsGraphUp,
  BsShieldCheck,
  BsClockHistory
} from "react-icons/bs";
import { BiTrendingUp, BiTrendingDown, BiCrosshair, BiRadar, BiWallet, BiTransfer } from 'react-icons/bi'
import { MdShowChart, MdAccountBalanceWallet, MdTimeline } from 'react-icons/md'
import { RiExchangeDollarLine, RiPieChart2Fill } from 'react-icons/ri'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

const WebAgent = () => {
  // --- STATE ---
  const [coinsData, setCoinsData] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])
  const [activeCoin, setActiveCoin] = useState(null)
  const [conversation, setConversation] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false) 
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('chat') 
  const [simulatedPrices, setSimulatedPrices] = useState({})
  const [marketSentiment, setMarketSentiment] = useState(72)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newsData, setNewsData] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [detailTab, setDetailTab] = useState('depth')
  const [holders, setHolders] = useState([])
  const [transactions, setTransactions] = useState([])
  const [marketMetrics, setMarketMetrics] = useState({})

  const chatEndRef = useRef(null)

  // --- 1. DATA ENGINE ---
  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=24h,7d'
      )
      
      let data = []
      if (response.ok) {
        data = await response.json()
      } else {
        data = generateBackupData()
      }
      
      // Inject REALISTIC World Liberty Financial Data
      const wlfiCoin = {
        id: 'wlfiai',
        symbol: 'wlfi',
        name: 'World Liberty',
        current_price: 0.1542,
        price_change_percentage_24h: 8.45,
        price_change_percentage_7d_in_currency: 15.2,
        market_cap: 4250000000,
        total_volume: 345000000,
        market_cap_rank: 0,
        image: '/logo.png',
        sparkline_in_7d: { price: Array.from({length: 40}, () => Math.random() * 0.05 + 0.12) },
        special: true,
        high_24h: 0.1620,
        low_24h: 0.1410,
        circulating_supply: 27500000000,
        total_supply: 100000000000,
        ath: 0.2450,
        atl: 0.0850
      }
      
      const combined = [wlfiCoin, ...data]
      setCoinsData(combined)
      if (!activeCoin) setActiveCoin(combined[0])
      
    } catch (error) {
      console.log("Using Backup Data Engine")
      const backup = generateBackupData()
      setCoinsData(backup)
      if (!activeCoin) setActiveCoin(backup[0])
    }
  }

  // --- 2. FETCH NEWS ---
  const fetchNews = async () => {
    setNewsLoading(true)
    try {
      // Using CryptoPanic API alternative - you can replace with your preferred news API
      const mockNews = [
        {
          title: "World Liberty AI Announces Major Partnership with Leading DeFi Protocol",
          source: "CryptoNews",
          time: "2 hours ago",
          sentiment: "positive"
        },
        {
          title: "Bitcoin Reaches New All-Time High Above $100K",
          source: "Bloomberg Crypto",
          time: "3 hours ago",
          sentiment: "positive"
        },
        {
          title: "Ethereum 2.0 Staking Surpasses $50 Billion",
          source: "CoinDesk",
          time: "5 hours ago",
          sentiment: "positive"
        },
        {
          title: "SEC Approves New Cryptocurrency ETF Framework",
          source: "Reuters",
          time: "6 hours ago",
          sentiment: "positive"
        },
        {
          title: "Major Exchange Announces Support for 15 New Altcoins",
          source: "CoinTelegraph",
          time: "8 hours ago",
          sentiment: "neutral"
        },
        {
          title: "Global Crypto Adoption Hits Record High in Q4",
          source: "Decrypt",
          time: "10 hours ago",
          sentiment: "positive"
        }
      ]
      setNewsData(mockNews)
    } catch (error) {
      console.log("News fetch error:", error)
    } finally {
      setNewsLoading(false)
    }
  }

  // --- 3. GENERATE HOLDERS DATA ---
  const generateHolders = (coin) => {
    return Array.from({length: 10}, (_, i) => ({
      address: `0x${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
      balance: (Math.random() * 1000000).toFixed(0),
      percentage: (Math.random() * 5).toFixed(2),
      type: i < 3 ? 'whale' : i < 7 ? 'holder' : 'trader'
    }))
  }

  // --- 4. GENERATE TRANSACTIONS ---
  const generateTransactions = (price) => {
    return Array.from({length: 20}, (_, i) => ({
      hash: `0x${Math.random().toString(36).substring(2, 15)}`,
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      amount: (Math.random() * 10000).toFixed(2),
      price: (price * (1 + (Math.random() * 0.02 - 0.01))).toFixed(4),
      time: `${Math.floor(Math.random() * 60)}m ago`,
      from: `0x${Math.random().toString(36).substring(2, 8)}...`,
      to: `0x${Math.random().toString(36).substring(2, 8)}...`
    }))
  }

  // --- 5. GENERATE MARKET METRICS ---
  const generateMarketMetrics = (coin) => {
    return {
      fdv: coin.market_cap * 2.5,
      volumeToMC: ((coin.total_volume / coin.market_cap) * 100).toFixed(2),
      holders: Math.floor(Math.random() * 50000) + 10000,
      transactions24h: Math.floor(Math.random() * 10000) + 1000,
      avgHoldTime: Math.floor(Math.random() * 90) + 30,
      whaleConcentration: (Math.random() * 30 + 10).toFixed(1)
    }
  }

  // --- 6. LIVE SIMULATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPrices(prev => {
        const next = { ...prev }
        coinsData.forEach(coin => {
          const volatility = coin.special ? 0.002 : 0.0005 
          const change = 1 + (Math.random() * volatility * 2 - volatility) 
          next[coin.id] = (next[coin.id] || coin.current_price) * change
        })
        return next
      })
      setMarketSentiment(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))))
    }, 2000)
    return () => clearInterval(interval)
  }, [coinsData])

  useEffect(() => { 
    fetchMarketData()
    fetchNews()
  }, [])

  useEffect(() => {
    if (activeCoin) {
      setHolders(generateHolders(activeCoin))
      setTransactions(generateTransactions(activeCoin.current_price))
      setMarketMetrics(generateMarketMetrics(activeCoin))
    }
  }, [activeCoin])

  // --- 7. FILTERING ---
  useEffect(() => {
    let result = coinsData.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCoins(result)
  }, [coinsData, searchQuery])

  // --- 8. CHAT LOGIC ---
  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input, timestamp: new Date() }
    setConversation(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

    setTimeout(() => {
      let reply = ""
      const lower = userMsg.content.toLowerCase()
      
      if (lower.includes('wlfi') || (activeCoin?.id === 'wlfiai')) {
        reply = `### 🟢 **WLFI INTELLIGENCE REPORT**\n\n**Confidence Score: 94% (High)**\n\n* **On-Chain:** Whale accumulation detected. 3 new wallets bought >1M WLFI in the last hour.\n* **Technical:** Price broke above the $0.15 resistance. Next target: **$0.18**.\n* **Sentiment:** Social volume is up 450% due to the new governance proposal.\n\n**Action:** Strong Buy signal confirmed by the AI consensus engine.`
      } else if (lower.includes('prediction') || lower.includes('price')) {
         reply = `### 🔮 **AI PREDICTION MODEL**\n\nRunning Monte Carlo simulations for **${activeCoin?.name}**...\n\n* **Short Term (24h):** Bullish divergence on the 4H chart suggests a move to **$${(activeCoin.current_price * 1.05).toFixed(4)}**.\n* **Volatility:** Expanding. Expect swings of +/- 5%.\n* **Support:** Strong buy wall detected at **$${(activeCoin.current_price * 0.92).toFixed(4)}**.`
      } else {
        reply = `**System Analysis:**\n\nI've scanned the order book for **${activeCoin?.name}**. \n\n* **Buy Pressure:** 62% \n* **Sell Pressure:** 38%\n\nThe market is currently favoring buyers. RSI is at 58 (Neutral-Bullish). Would you like to see the correlation matrix with BTC?`
      }

      setConversation(prev => [...prev, { role: 'assistant', content: reply, timestamp: new Date() }])
      setLoading(false)
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }, 2000)
  }

  // --- MOCK DATA ---
  const generateBackupData = () => {
    return ['Bitcoin','Ethereum','Solana','BNB','XRP'].map((n, i) => ({
      id: n.toLowerCase(), 
      symbol: n.substring(0,3).toUpperCase(), 
      name: n,
      current_price: 100 * (i+1), 
      price_change_percentage_24h: 5,
      market_cap_rank: i+1, 
      total_volume: 1000000,
      image: `https://via.placeholder.com/30?text=${n[0]}`,
      sparkline_in_7d: { price: Array.from({length: 40}, () => Math.random() * 100) }
    }))
  }

  return (
    <div className="h-screen bg-[#000000] text-white font-sans overflow-hidden flex flex-col selection:bg-[#39FF14] selection:text-black">
      
      {/* HEADER */}
      <header className="h-14 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between px-4 shrink-0 relative z-50">
         <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded"
            >
              <div className="w-5 h-0.5 bg-white mb-1"></div>
              <div className="w-5 h-0.5 bg-white mb-1"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </button>
            
            <div className="flex items-center gap-2">
               <BsTerminal className="text-[#39FF14]" size={18}/>
               <span className="font-bold tracking-tight text-sm md:text-base">
                 WLFIAI <span className="text-[#39FF14]">TERMINAL</span>
               </span>
            </div>
            
            <div className="hidden md:block h-4 w-px bg-white/10 mx-2" />
            
            <div className="hidden md:flex items-center gap-3">
               <span className="text-[10px] text-[#666] uppercase tracking-wider">Market Sentiment</span>
               <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-[#39FF14]" 
                    animate={{ width: `${marketSentiment}%` }}
                    transition={{ duration: 1 }}
                  />
               </div>
               <span className="text-xs font-mono text-[#39FF14]">{marketSentiment}/100</span>
            </div>
         </div>

         <div className="flex items-center gap-2 md:gap-4">
             <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded text-[9px] md:text-[10px] text-[#39FF14]">
                <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse" />
                <span className="hidden sm:inline">SYSTEM ONLINE</span>
             </div>
             <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#39FF14] to-[#004400] flex items-center justify-center text-black font-bold text-xs">
                AI
             </div>
         </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex overflow-hidden relative">
         
         {/* LEFT SIDEBAR - MOBILE OVERLAY */}
         <AnimatePresence>
           {(sidebarOpen || window.innerWidth >= 1024) && (
             <motion.div 
               initial={{ x: -320 }}
               animate={{ x: 0 }}
               exit={{ x: -320 }}
               className={`${sidebarOpen ? 'fixed inset-y-0 z-40' : 'relative'} lg:relative w-80 bg-[#050505] border-r border-white/10 flex flex-col shrink-0`}
             >
               {/* Overlay for mobile */}
               {sidebarOpen && (
                 <div 
                   onClick={() => setSidebarOpen(false)}
                   className="lg:hidden fixed inset-0 bg-black/50 -z-10"
                 />
               )}
               
               {/* Search */}
               <div className="p-3 border-b border-white/10">
                  <div className="relative">
                     <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-xs" />
                     <input 
                       type="text" 
                       placeholder="SEARCH ASSETS..."
                       value={searchQuery}
                       onChange={e => setSearchQuery(e.target.value)}
                       className="w-full bg-[#111] border border-white/10 rounded-md py-2 pl-8 pr-3 text-xs text-white focus:border-[#39FF14] outline-none font-mono uppercase"
                     />
                  </div>
               </div>
               
               {/* List */}
               <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                  {filteredCoins.map(coin => (
                     <div 
                       key={coin.id}
                       onClick={() => {
                         setActiveCoin(coin)
                         setSidebarOpen(false)
                       }}
                       className={`flex items-center justify-between p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${activeCoin?.id === coin.id ? 'bg-[#39FF14]/5 border-l-2 border-l-[#39FF14]' : 'border-l-2 border-l-transparent'}`}
                     >
                        <div className="flex items-center gap-3">
                           {coin.id === 'wlfiai' ? (
                             <div className="w-6 h-6 rounded-full bg-[#39FF14] flex items-center justify-center text-[10px] text-black font-bold">W</div>
                           ) : (
                             <Image src={coin.image} alt={coin.symbol} width={24} height={24} className="rounded-full" />
                           )}
                           <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1">
                                 {coin.symbol.toUpperCase()}
                                 {coin.special && <BsStars className="text-[#39FF14]" size={10} />}
                              </div>
                              <div className="text-[10px] text-[#666] truncate w-20">{coin.name}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs font-mono text-white">
                              ${(simulatedPrices[coin.id] || coin.current_price).toFixed(coin.current_price < 1 ? 4 : 2)}
                           </div>
                           <div className={`text-[10px] ${coin.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-red-500'}`}>
                              {coin.price_change_percentage_24h.toFixed(2)}%
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
             </motion.div>
           )}
         </AnimatePresence>

         {/* CENTER - DATA VISUALIZATION */}
         <div className="flex-1 bg-[#000] flex flex-col min-w-0 overflow-y-auto">
            
            {/* Top Bar: Active Coin Stats */}
            {activeCoin && (
               <div className="h-auto md:h-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:px-6 bg-[#080808] shrink-0 gap-2 md:gap-0">
                  <div className="flex items-center gap-3 md:gap-4">
                     <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 p-1.5 shrink-0">
                        <Image src={activeCoin.image} alt="c" width={40} height={40} className="w-full h-full object-contain" />
                     </div>
                     <div>
                        <h2 className="text-lg md:text-xl font-bold text-white leading-none">{activeCoin.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-xs font-mono text-[#666]">{activeCoin.symbol.toUpperCase()}/USD</span>
                           <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-[#888]">Rank #{activeCoin.market_cap_rank || 'PRO'}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="text-left md:text-right w-full md:w-auto">
                     <motion.div 
                        key={simulatedPrices[activeCoin.id]}
                        initial={{ color: '#fff' }}
                        animate={{ color: ['#fff', '#39FF14', '#fff'] }}
                        className="text-xl md:text-2xl font-mono font-bold"
                     >
                        ${(simulatedPrices[activeCoin.id] || activeCoin.current_price).toFixed(4)}
                     </motion.div>
                     <div className={`text-sm ${activeCoin.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-red-500'}`}>
                       {activeCoin.price_change_percentage_24h >= 0 ? '+' : ''}{activeCoin.price_change_percentage_24h.toFixed(2)}%
                     </div>
                  </div>
               </div>
            )}

            {/* Scrollable Content Area */}
            <div className="flex-1 p-2 md:p-4 space-y-4 overflow-y-auto">
               
               {/* Main Chart */}
               <div className="h-64 md:h-80 bg-[#0A0A0A] border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
                     {['1H', '24H', '7D', '1M', '1Y'].map(t => (
                        <button key={t} className="text-[10px] px-2 py-1 bg-white/5 rounded hover:bg-[#39FF14] hover:text-black transition-colors">{t}</button>
                     ))}
                  </div>
                  <ChartViz data={activeCoin?.sparkline_in_7d?.price || []} color="#39FF14" />
               </div>

               {/* Detail Tabs */}
               <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden">
                  {/* Tab Navigation */}
                  <div className="flex border-b border-white/10 overflow-x-auto scrollbar-thin">
                     {[
                       { id: 'depth', label: 'DEPTH', icon: FaLayerGroup },
                       { id: 'trades', label: 'TRADES', icon: FaBolt },
                       { id: 'holders', label: 'HOLDERS', icon: FaUsers },
                       { id: 'transactions', label: 'TX', icon: BiTransfer },
                       { id: 'metrics', label: 'METRICS', icon: BsBarChartFill },
                       { id: 'history', label: 'HISTORY', icon: FaHistory }
                     ].map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => setDetailTab(tab.id)}
                         className={`flex items-center gap-2 px-3 md:px-4 py-3 text-[10px] font-bold transition-all border-b-2 whitespace-nowrap ${
                           detailTab === tab.id 
                             ? 'border-[#39FF14] text-[#39FF14] bg-[#39FF14]/5' 
                             : 'border-transparent text-[#666] hover:text-white'
                         }`}
                       >
                         <tab.icon size={12} />
                         <span className="hidden sm:inline">{tab.label}</span>
                       </button>
                     ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-4 h-64 overflow-y-auto scrollbar-thin">
                     {detailTab === 'depth' && <OrderBook price={activeCoin?.current_price || 0} />}
                     {detailTab === 'trades' && <LiveTrades price={activeCoin?.current_price || 0} />}
                     {detailTab === 'holders' && <HoldersView holders={holders} />}
                     {detailTab === 'transactions' && <TransactionsView transactions={transactions} />}
                     {detailTab === 'metrics' && <MetricsView metrics={marketMetrics} coin={activeCoin} />}
                     {detailTab === 'history' && <PriceHistory coin={activeCoin} />}
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT SIDEBAR - AI AGENT */}
         <div className="hidden xl:flex w-96 bg-[#080808] border-l border-white/10 flex-col shrink-0">
            
            {/* Tabs */}
            <div className="flex border-b border-white/10">
               {['CHAT', 'SIGNALS', 'NEWS'].map(tab => (
                  <button 
                     key={tab} 
                     onClick={() => setActiveTab(tab.toLowerCase())}
                     className={`flex-1 py-3 text-[10px] font-bold transition-all border-b-2 ${activeTab === tab.toLowerCase() ? 'border-[#39FF14] text-[#39FF14] bg-[#39FF14]/5' : 'border-transparent text-[#666] hover:text-white'}`}
                  >
                     {tab}
                  </button>
               ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
               {activeTab === 'chat' && (
                  <>
                     <div className="space-y-4 min-h-[300px]">
                        {conversation.length === 0 && (
                           <div className="text-center mt-10 opacity-50">
                              <FaRobot size={32} className="mx-auto mb-2 text-[#39FF14]"/>
                              <p className="text-xs text-[#666]">AI Agent Ready. Awaiting Command.</p>
                              <div className="flex flex-wrap gap-2 justify-center mt-4">
                                 {['Analyze WLFI', 'Price Prediction', 'Whale Alert'].map(t => (
                                    <button key={t} onClick={() => setInput(t)} className="text-[10px] border border-white/10 px-2 py-1 rounded-full hover:border-[#39FF14] transition-colors">{t}</button>
                                 ))}
                              </div>
                           </div>
                        )}
                        {conversation.map((msg, i) => (
                           <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[90%] p-3 rounded-xl text-xs ${msg.role === 'user' ? 'bg-[#39FF14] text-black font-medium' : 'bg-[#151515] border border-white/10 text-[#CCC]'}`}>
                                 <ReactMarkdown components={{strong: ({node, ...props}) => <span className="font-bold text-[#39FF14]" {...props} />}}>{msg.content}</ReactMarkdown>
                              </div>
                           </div>
                        ))}
                        {loading && <div className="flex gap-1 pl-2"><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce"/><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce delay-75"/><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce delay-150"/></div>}
                        <div ref={chatEndRef}/>
                     </div>
                  </>
               )}

               {activeTab === 'signals' && (
                  <div className="space-y-3">
                     <div className="bg-[#111] border border-white/10 p-3 rounded-lg flex items-center justify-between">
                        <div>
                           <div className="text-[10px] text-[#666] uppercase">Signal Strength</div>
                           <div className="text-lg font-bold text-[#39FF14]">STRONG BUY</div>
                        </div>
                        <BiRadar className="text-[#39FF14] text-2xl animate-pulse"/>
                     </div>
                     <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
                        <div className="text-[10px] text-[#666] uppercase mb-2">Technical Indicators</div>
                        <div className="space-y-1">
                           <div className="flex justify-between text-xs"><span className="text-[#CCC]">RSI (14)</span><span className="text-[#39FF14]">42.5 (Neutral)</span></div>
                           <div className="flex justify-between text-xs"><span className="text-[#CCC]">MACD</span><span className="text-[#39FF14]">Bullish Cross</span></div>
                           <div className="flex justify-between text-xs"><span className="text-[#CCC]">MA (200)</span><span className="text-red-500">Below</span></div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'news' && (
                 <div className="space-y-3">
                   {newsLoading ? (
                     <div className="flex items-center justify-center py-10">
                       <FaSpinner className="animate-spin text-[#39FF14]" size={24} />
                     </div>
                   ) : (
                     newsData.map((news, i) => (
                       <div key={i} className="bg-[#111] border border-white/10 p-3 rounded-lg hover:border-[#39FF14]/30 transition-colors cursor-pointer">
                         <div className="flex items-start justify-between gap-2 mb-2">
                           <h4 className="text-xs font-medium text-white leading-tight">{news.title}</h4>
                           <div className={`shrink-0 w-2 h-2 rounded-full ${news.sentiment === 'positive' ? 'bg-[#39FF14]' : news.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                         </div>
                         <div className="flex items-center justify-between text-[10px] text-[#666]">
                           <span>{news.source}</span>
                           <span>{news.time}</span>
                         </div>
                       </div>
                     ))
                   )}
                 </div>
               )}
            </div>

            {/* Chat Input Area */}
            {activeTab === 'chat' && (
               <div className="p-3 border-t border-white/10 bg-[#0A0A0A]">
                  <form onSubmit={handleSend} className="relative">
                     <input 
                       type="text"
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       placeholder="Enter AI Command..."
                       className="w-full bg-[#111] border border-white/10 rounded-lg pl-3 pr-10 py-3 text-xs text-white focus:outline-none focus:border-[#39FF14]/50 font-mono"
                     />
                     <button type="submit" disabled={loading} className="absolute right-2 top-2 bottom-2 text-[#39FF14] hover:text-white transition-colors disabled:opacity-50">
                        <FaPaperPlane size={12} />
                     </button>
                  </form>
               </div>
            )}
         </div>

         {/* Mobile AI Button */}
         <button
           onClick={() => setActiveTab('chat')}
           className="xl:hidden fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#004400] rounded-full flex items-center justify-center shadow-lg z-50"
         >
           <FaRobot size={24} className="text-black" />
         </button>
      </main>

      {/* Mobile AI Modal */}
      <AnimatePresence>
        {activeTab && window.innerWidth < 1280 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="xl:hidden fixed inset-0 bg-[#080808] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-[#39FF14]">{activeTab.toUpperCase()}</h3>
              <button onClick={() => setActiveTab(null)} className="text-white">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {activeTab === 'chat' && (
                <>
                  <div className="space-y-4">
                    {conversation.length === 0 && (
                      <div className="text-center mt-10 opacity-50">
                        <FaRobot size={32} className="mx-auto mb-2 text-[#39FF14]"/>
                        <p className="text-xs text-[#666]">AI Agent Ready. Awaiting Command.</p>
                      </div>
                    )}
                    {conversation.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] p-3 rounded-xl text-xs ${msg.role === 'user' ? 'bg-[#39FF14] text-black font-medium' : 'bg-[#151515] border border-white/10 text-[#CCC]'}`}>
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    {loading && <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce"/></div>}
                    <div ref={chatEndRef}/>
                  </div>
                </>
              )}
            </div>

            {activeTab === 'chat' && (
              <div className="p-3 border-t border-white/10">
                <form onSubmit={handleSend} className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter AI Command..."
                    className="w-full bg-[#111] border border-white/10 rounded-lg pl-3 pr-10 py-3 text-xs text-white focus:outline-none focus:border-[#39FF14]/50"
                  />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 text-[#39FF14]">
                    <FaPaperPlane size={12} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// === SUB-COMPONENTS ===

const OrderBook = ({ price }) => {
   const asks = Array.from({length: 8}, (_,i) => ({ price: price * (1+(i+1)*0.0005), size: Math.random()*10 }))
   const bids = Array.from({length: 8}, (_,i) => ({ price: price * (1-(i+1)*0.0005), size: Math.random()*10 }))
   return (
      <div className="flex-1 flex flex-col text-[10px] font-mono">
         <div className="flex justify-between text-[#666] mb-2 text-xs">
           <span>Price (USD)</span>
           <span>Amount</span>
         </div>
         <div className="flex-1 flex flex-col-reverse justify-end">
            {asks.slice(0,5).map((a,i) => (
               <div key={i} className="flex justify-between relative group hover:bg-white/5 py-1">
                  <span className="text-red-500 z-10">{a.price.toFixed(4)}</span>
                  <span className="text-[#666] z-10">{a.size.toFixed(2)}</span>
                  <div className="absolute right-0 top-0 bottom-0 bg-red-500/10" style={{width: `${Math.random()*100}%`}}/>
               </div>
            ))}
         </div>
         <div className="py-2 text-center text-xs font-bold text-white border-y border-white/5 my-1">${price.toFixed(4)}</div>
         <div className="flex-1">
            {bids.slice(0,5).map((b,i) => (
               <div key={i} className="flex justify-between relative group hover:bg-white/5 py-1">
                  <span className="text-[#39FF14] z-10">{b.price.toFixed(4)}</span>
                  <span className="text-[#666] z-10">{b.size.toFixed(2)}</span>
                  <div className="absolute right-0 top-0 bottom-0 bg-[#39FF14]/10" style={{width: `${Math.random()*100}%`}}/>
               </div>
            ))}
         </div>
      </div>
   )
}

const LiveTrades = ({ price }) => {
   const [trades, setTrades] = useState([])
   
   useEffect(() => {
      const interval = setInterval(() => {
         const newTrade = {
            price: price * (1 + (Math.random()*0.002 - 0.001)),
            size: Math.random() * 5,
            side: Math.random() > 0.5 ? 'buy' : 'sell',
            time: new Date().toLocaleTimeString([], {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'})
         }
         setTrades(prev => [newTrade, ...prev].slice(0, 15))
      }, 800)
      return () => clearInterval(interval)
   }, [price])

   return (
      <div className="space-y-1">
        <div className="flex justify-between text-[#666] mb-2 text-xs font-mono">
          <span>Price</span>
          <span>Amount</span>
          <span>Time</span>
        </div>
        {trades.map((t, i) => (
          <div key={i} className="flex items-center font-mono text-[10px]">
             <span className={`w-16 ${t.side === 'buy' ? 'text-[#39FF14]' : 'text-red-500'}`}>{t.price.toFixed(4)}</span>
             <span className="flex-1 text-right text-white">{t.size.toFixed(3)}</span>
             <span className="w-20 text-right text-[#666]">{t.time}</span>
          </div>
        ))}
      </div>
   )
}

const HoldersView = ({ holders }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[#666] mb-3 text-xs">
        <span>Address</span>
        <span>Balance</span>
        <span>%</span>
      </div>
      {holders.map((holder, i) => (
        <div key={i} className="flex items-center justify-between bg-[#111] p-2 rounded border border-white/5 hover:border-[#39FF14]/20 transition-colors">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className={`w-2 h-2 rounded-full shrink-0 ${holder.type === 'whale' ? 'bg-[#39FF14]' : holder.type === 'holder' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
            <span className="text-[10px] font-mono text-[#AAA] truncate">{holder.address}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-white">{Number(holder.balance).toLocaleString()}</span>
            <span className="text-[10px] text-[#39FF14]">{holder.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const TransactionsView = ({ transactions }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[#666] mb-3 text-xs">
        <span>Type</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      {transactions.map((tx, i) => (
        <div key={i} className="flex items-center justify-between bg-[#111] p-2 rounded border border-white/5 hover:border-[#39FF14]/20 transition-colors">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${tx.type === 'buy' ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-red-500/20 text-red-500'}`}>
              {tx.type.toUpperCase()}
            </div>
            <span className="text-[10px] text-white">${tx.amount}</span>
          </div>
          <span className="text-[10px] text-[#666]">{tx.time}</span>
        </div>
      ))}
    </div>
  )
}

const MetricsView = ({ metrics, coin }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
        <div className="text-[10px] text-[#666] uppercase mb-1">Market Cap</div>
        <div className="text-lg font-bold text-[#39FF14]">${(coin?.market_cap / 1e9).toFixed(2)}B</div>
      </div>
      <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
        <div className="text-[10px] text-[#666] uppercase mb-1">24h Volume</div>
        <div className="text-lg font-bold text-[#39FF14]">${(coin?.total_volume / 1e6).toFixed(1)}M</div>
      </div>
      <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
        <div className="text-[10px] text-[#666] uppercase mb-1">FDV</div>
        <div className="text-lg font-bold text-white">${(metrics.fdv / 1e9).toFixed(2)}B</div>
      </div>
      <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
        <div className="text-[10px] text-[#666] uppercase mb-1">Vol/MC Ratio</div>
        <div className="text-lg font-bold text-white">{metrics.volumeToMC}%</div>
      </div>
      <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
        <div className="text-[10px] text-[#666] uppercase mb-1">Total Holders</div>
        <div className="text-lg font-bold text-[#39FF14]">{metrics.holders?.toLocaleString()}</div>
      </div>
      <div className="bg-[#111] border border-white/10 p-3 rounded-lg">
        <div className="text-[10px] text-[#666] uppercase mb-1">24h Transactions</div>
        <div className="text-lg font-bold text-white">{metrics.transactions24h?.toLocaleString()}</div>
      </div>
    </div>
  )
}

const PriceHistory = ({ coin }) => {
  return (
    <div className="space-y-3">
      <div className="bg-[#111] border border-white/10 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-[#666]">24h High</span>
          <span className="text-sm font-bold text-[#39FF14]">${coin?.high_24h?.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-[#666]">24h Low</span>
          <span className="text-sm font-bold text-red-500">${coin?.low_24h?.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-[#666]">All-Time High</span>
          <span className="text-sm font-bold text-white">${coin?.ath?.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#666]">All-Time Low</span>
          <span className="text-sm font-bold text-white">${coin?.atl?.toFixed(4)}</span>
        </div>
      </div>
      
      <div className="bg-[#111] border border-white/10 p-4 rounded-lg">
        <div className="text-xs text-[#666] uppercase mb-3">Price Changes</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-[#AAA]">24h</span>
            <span className={`text-sm font-bold ${coin?.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-red-500'}`}>
              {coin?.price_change_percentage_24h >= 0 ? '+' : ''}{coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#AAA]">7d</span>
            <span className={`text-sm font-bold ${coin?.price_change_percentage_7d_in_currency >= 0 ? 'text-[#39FF14]' : 'text-red-500'}`}>
              {coin?.price_change_percentage_7d_in_currency >= 0 ? '+' : ''}{coin?.price_change_percentage_7d_in_currency?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChartViz = ({ data, color }) => {
   if(!data || data.length < 2) return <div className="w-full h-full flex items-center justify-center text-xs text-[#444]">NO DATA</div>
   
   const width = 1000;
   const height = 400;
   const min = Math.min(...data);
   const max = Math.max(...data);
   const range = max - min;
   
   const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 20) - 10;
      return `${x},${y}`;
   }).join(' L ');
   
   return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
         <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
               <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
         </defs>
         <path d={`M 0,${height} L ${points} L ${width},${height} Z`} fill="url(#g)" />
         <path d={`M ${points}`} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke"/>
      </svg>
   )
}

export default WebAgent
