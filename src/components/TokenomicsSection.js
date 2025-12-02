'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  FaKey, 
  FaBolt, 
  FaGift,
  FaChartPie,
  FaCoins,
  FaUsers,
  FaRocket,
  FaLock,
  FaHandHoldingHeart
} from 'react-icons/fa'

const TokenomicsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(null)

  // --- DATA CONFIGURATION ---
  const tokenomicsData = [
    { 
      title: 'Data Mining Rewards', 
      value: 40, 
      color: '#39FF14', 
      icon: FaGift, 
      desc: 'Incentivized community nodes & validation',
      details: '40% allocated to reward node operators and data validators over a 5-year halving schedule.'
    },
    { 
      title: 'Ecosystem Growth', 
      value: 25, 
      color: '#00E0FF', 
      icon: FaRocket, 
      desc: 'Partnerships, Grants & Development',
      details: 'Funds for strategic partnerships, developer grants, and expanding the WLFI protocol.'
    },
    { 
      title: 'Core Team', 
      value: 15, 
      color: '#FFFFFF', 
      icon: FaUsers, 
      desc: 'Founders & Contributors (Vested)',
      details: '12-month cliff followed by linear vesting over 36 months to ensure long-term alignment.'
    },
    { 
      title: 'Liquidity Reserves', 
      value: 10, 
      color: '#B3FF66', 
      icon: FaCoins, 
      desc: 'CEX/DEX Market Making',
      details: 'Provided to market makers to ensure deep liquidity and low slippage on all pairs.'
    },
    { 
      title: 'Marketing & Treasury', 
      value: 10, 
      color: '#444444', 
      icon: FaChartPie, 
      desc: 'Global Awareness & Operations',
      details: 'Used for global campaigns, exchange listings, and operational costs.'
    },
  ]

  const totalAllocation = tokenomicsData.reduce((acc, item) => acc + item.value, 0)

  return (
    <section 
      id='tokenomics'
      ref={sectionRef}
      className="relative py-10 sm:py-24 bg-[#050505] overflow-hidden min-h-screen flex items-center"
    >
      {/* --- Background FX --- */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#39FF14] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-white/5 pb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Token Economy</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.1]"
            >
              Strategic <br/> <span className="text-[#666]">Distribution Model.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-right hidden md:block"
          >
            <div className="text-sm text-[#888] font-mono mb-1">TOTAL SUPPLY</div>
            <div className="text-3xl font-medium text-white tracking-tight">1,000,000,000</div>
            <div className="text-xs text-[#39FF14] font-mono mt-1">FIXED CAP</div>
          </motion.div>
        </div>

        {/* --- Main Dashboard Grid --- */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Chart Visualization */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-[#0A0A0A]/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 lg:p-12 flex flex-col items-center justify-center aspect-square shadow-2xl">
              
              {/* Custom SVG Donut Chart */}
              <div className="relative w-full h-full max-w-[400px] max-h-[400px]">
                <DonutChart 
                  data={tokenomicsData} 
                  activeIndex={activeIndex} 
                  onHover={setActiveIndex}
                />
                
                {/* Center Dynamic Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <motion.div
                    key={activeIndex !== null ? activeIndex : 'default'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className="text-xs text-[#666] font-mono uppercase tracking-widest mb-1">
                      {activeIndex !== null ? 'Allocation' : 'Total Supply'}
                    </div>
                    <div className="text-4xl md:text-5xl font-medium text-white tracking-tighter">
                      {activeIndex !== null ? `${tokenomicsData[activeIndex].value}%` : '1B'}
                    </div>
                    <div className="text-sm font-medium mt-1" style={{ color: activeIndex !== null ? tokenomicsData[activeIndex].color : '#39FF14' }}>
                      {activeIndex !== null ? tokenomicsData[activeIndex].title : '$WLFI'}
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: Detailed Breakdown (Bento Grid) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {tokenomicsData.map((item, index) => (
              <TokenCard 
                key={index}
                item={item}
                index={index}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}

            {/* Bottom Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#39FF14]/30 transition-colors group">
                <FaLock className="text-[#39FF14] mb-4 text-xl group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-medium mb-1">Vesting Schedule</h4>
                <p className="text-xs text-[#666] leading-relaxed">Smart contract enforced linear vesting for team & advisors.</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#39FF14]/30 transition-colors group">
                <FaHandHoldingHeart className="text-[#00E0FF] mb-4 text-xl group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-medium mb-1">Community Governance</h4>
                <p className="text-xs text-[#666] leading-relaxed">Token holders vote on treasury usage and protocol upgrades.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

// --- SUB-COMPONENT: TOKEN CARD ---
const TokenCard = ({ item, index, isActive, onHover, onLeave }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden ${
        isActive 
          ? 'bg-[#121212] border-[#39FF14]/40 scale-[1.02] shadow-[0_0_30px_rgba(57,255,20,0.1)]' 
          : 'bg-[#0A0A0A] border-white/5 hover:border-white/10'
      }`}
    >
      {/* Active Glow Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-10' : ''}`}
        style={{ background: `linear-gradient(90deg, ${item.color}10 0%, transparent 100%)` }}
      />

      <div className="relative z-10 flex items-start gap-5">
        {/* Icon Box */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0"
          style={{ 
            backgroundColor: isActive ? `${item.color}20` : 'rgba(255,255,255,0.03)',
            borderColor: isActive ? `${item.color}40` : 'rgba(255,255,255,0.05)',
            color: isActive ? item.color : '#666'
          }}
        >
          <item.icon size={20} />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className={`text-lg font-medium transition-colors ${isActive ? 'text-white' : 'text-[#DDD]'}`}>
              {item.title}
            </h3>
            <span className="font-mono text-xl font-bold" style={{ color: isActive ? item.color : '#444' }}>
              {item.value}%
            </span>
          </div>
          
          <p className="text-sm text-[#666] mb-3">{item.desc}</p>
          
          {/* Animated Details Expand */}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-white/5 text-xs text-[#888] leading-relaxed">
              {item.details}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Progress Bar Visual at bottom */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
        <motion.div 
          className="h-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${item.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          style={{ backgroundColor: item.color }}
        />
      </div>
    </motion.div>
  )
}

// --- SUB-COMPONENT: ADVANCED SVG DONUT CHART ---
const DonutChart = ({ data, activeIndex, onHover }) => {
  const radius = 90;
  const strokeWidth = 20; // Thick, premium look
  const center = 100; // SVG ViewBox center
  const circumference = 2 * Math.PI * radius;

  // We rotate the chart so the first segment starts at the top (-90deg)
  let accumulatedAngle = -90; 

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
      
      {/* Glow Filter Definition */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Track Background */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke="#151515"
        strokeWidth={strokeWidth}
      />

      {/* Segments */}
      {data.map((item, index) => {
        const percentage = item.value / 100;
        const strokeLength = circumference * percentage;
        const gapLength = circumference - strokeLength;
        const isActive = activeIndex === index;
        
        // Calculate current rotation for this segment
        const currentRotation = accumulatedAngle;
        
        // Update accumulator for next segment (360 * percentage)
        accumulatedAngle += (percentage * 360);

        return (
          <motion.circle
            key={index}
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth={strokeWidth}
            
            // The magic: Dasharray defines the stroke length, Dashoffset is 0 because we handle position via rotation
            strokeDasharray={`${strokeLength} ${gapLength}`} 
            strokeDashoffset={0}
            strokeLinecap="round" // Rounded ends for premium feel
            
            initial={{ strokeDasharray: `0 ${circumference}`, opacity: 0 }}
            animate={{ 
              strokeDasharray: `${strokeLength} ${gapLength}`,
              opacity: activeIndex !== null && !isActive ? 0.3 : 1, // Dim others
              strokeWidth: isActive ? 26 : 20, // Expand on hover
            }}
            transition={{ 
              strokeDasharray: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (index * 0.1) }, // Staggered draw
              strokeWidth: { duration: 0.3 },
              opacity: { duration: 0.3 }
            }}
            
            // Rotation is static based on data position
            style={{ 
              transformOrigin: 'center', 
              rotate: `${currentRotation}deg`,
              filter: isActive ? `url(#glow)` : 'none', // Apply neon glow on hover
              cursor: 'pointer'
            }}

            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
          />
        );
      })}
    </svg>
  );
};

export default TokenomicsSection