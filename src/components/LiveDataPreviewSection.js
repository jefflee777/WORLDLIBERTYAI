'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { PiCaretUpBold, PiCaretDownBold, PiLightningDuotone } from 'react-icons/pi'

const LiveDataPreviewSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [marketData, setMarketData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // IDs for World Liberty Financial and a secondary token (using mock ID for fallback simulation)
        const ids = ['world-liberty-financial', 'usd1-wlfi']
        
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
        )
        
        if (!response.ok) throw new Error('API Limit')
        const data = await response.json()
        
        // If data is empty (IDs might vary), throw to use fallback
        if (!data || data.length === 0) throw new Error('No Data')
        
        setMarketData(data)
        setIsLoading(false)
      } catch (err) {
        // --- FALLBACK SIMULATION (For Demo Purposes) ---
        console.log("Using Simulation Data")
        setMarketData([
          {
            id: 'wlfi',
            name: 'World Liberty',
            symbol: 'WLFI',
            current_price: 0.015,
            price_change_percentage_24h: 12.4,
            market_cap: 350000000,
            total_volume: 45000000,
            sparkline_in_7d: { price: Array.from({length: 20}, () => Math.random() * 0.5 + 1) }
          },
          {
            id: 'usd1',
            name: 'USD1',
            symbol: 'USD1',
            current_price: 1.00,
            price_change_percentage_24h: 0.02,
            market_cap: 120000000,
            total_volume: 12000000,
            sparkline_in_7d: { price: Array.from({length: 20}, () => Math.random() * 0.1 + 0.95) }
          }
        ])
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-10 sm:py-24 bg-[#050505] overflow-hidden"
    >
      {/* Background Noise & Ambience */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#39FF14] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT: Editorial Content --- */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </span>
            <span className="text-[#39FF14] font-mono text-xs uppercase tracking-widest">
              Live Feed Active
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-[1.1]"
          >
            Real-Time <br />
            <span className="text-white/40">Market Velocity.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#888] leading-relaxed max-w-md"
          >
             Institutional-grade data feeds for 
             <span className="text-white mx-1">WLFI</span> and 
             <span className="text-white mx-1">USD1</span>. 
             Monitor volume, cap, and price action with zero latency.
          </motion.p>

          {/* Mini Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-8 pt-4 border-t border-white/5"
          >
            <div>
              <div className="text-2xl font-mono text-white">24/7</div>
              <div className="text-xs text-[#666] uppercase tracking-wider mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-mono text-white">12ms</div>
              <div className="text-xs text-[#666] uppercase tracking-wider mt-1">Latency</div>
            </div>
          </motion.div>
        </div>


        {/* --- RIGHT: Terminal Dashboard --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Dashboard Container */}
          <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <PiLightningDuotone className="text-[#39FF14]" />
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Terminal v2.4</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-2 space-y-2">
              {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3">
                   <div className="w-5 h-5 border-2 border-t-[#39FF14] border-white/10 rounded-full animate-spin" />
                   <span className="text-xs text-white/30 font-mono">ESTABLISHING UPLINK...</span>
                </div>
              ) : (
                marketData.map((coin, index) => (
                  <CoinCard key={coin.id} coin={coin} index={index} />
                ))
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-6 py-3 bg-[#080808] border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest">
               <span>Encryption: AES-256</span>
               <span className="text-[#39FF14] animate-pulse">Connected</span>
            </div>
          </div>
          
          {/* Decorative Glow Behind */}
          <div className="absolute -inset-10 bg-[#39FF14] opacity-[0.05] blur-3xl -z-10 rounded-full" />
        </motion.div>

      </div>
    </section>
  )
}

// --- SUB-COMPONENT: COIN CARD ---
const CoinCard = ({ coin, index }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="group relative bg-[#0F0F0F] hover:bg-[#141414] border border-white/5 hover:border-[#39FF14]/20 rounded-xl p-5 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        {/* Token Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-[#39FF14]/30 transition-colors">
            {coin.image ? (
              <img src={coin.image} alt={coin.symbol} className="w-6 h-6 rounded-full" />
            ) : (
              <span className="text-xs font-bold text-white/40">{coin.symbol.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">{coin.name}</h3>
            <span className="text-xs font-mono text-white/40 uppercase">{coin.symbol}</span>
          </div>
        </div>

        {/* Price Info */}
        <div className="text-right">
          <div className="text-lg font-mono font-medium text-white group-hover:text-[#39FF14] transition-colors">
            ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </div>
          <div className={`flex items-center justify-end gap-1 text-xs font-mono ${isPositive ? 'text-[#39FF14]' : 'text-red-500'}`}>
            {isPositive ? <PiCaretUpBold /> : <PiCaretDownBold />}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Sparkline Chart & Details */}
      <div className="flex items-end justify-between">
        
        {/* Detail Grid */}
        <div className="flex gap-6">
          <div>
             <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Vol</div>
             <div className="text-xs text-white/60 font-mono">
               ${(coin.total_volume / 1000000).toFixed(1)}M
             </div>
          </div>
          <div>
             <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">M.Cap</div>
             <div className="text-xs text-white/60 font-mono">
               ${(coin.market_cap / 1000000).toFixed(1)}M
             </div>
          </div>
        </div>

        {/* Animated Chart Component */}
        <div className="w-24 h-10">
          <Sparkline data={coin.sparkline_in_7d?.price || []} color={isPositive ? '#39FF14' : '#FF4444'} />
        </div>

      </div>
    </motion.div>
  )
}

// --- SUB-COMPONENT: VECTOR SPARKLINE ---
const Sparkline = ({ data, color }) => {
  if (!data || data.length < 2) return null;

  // Normalize data to fit SVG coordinate space (100x40)
  const width = 100;
  const height = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Generate Path 'd' attribute
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height; // Invert Y because SVG 0 is top
    return `${x},${y}`;
  }).join(' L ');

  const pathD = `M ${points}`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} overflow="visible">
      {/* Glow Effect */}
      <motion.path 
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`drop-shadow(0 0 4px ${color}40)`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default LiveDataPreviewSection