'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  PiBinocularsDuotone, 
  PiTargetDuotone, 
  PiChartLineUpDuotone, 
  PiShieldCheckDuotone, 
  PiCpuDuotone, 
  PiTelegramLogoDuotone,
  PiArrowRight,
  PiLightningDuotone
} from 'react-icons/pi'

// --- MICRO COMPONENTS ---

const GlowingCard = ({ icon: Icon, title, desc, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5 }}
    className="group relative p-8 rounded-3xl bg-[#080808] border border-white/5 overflow-hidden transition-all duration-300 hover:border-[#39FF14]/30"
  >
    {/* Hover Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Top Accent Line */}
    <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#39FF14] group-hover:w-full transition-all duration-700 ease-out" />

    <div className="relative z-10 flex flex-col h-full">
      <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/5 text-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-black transition-colors duration-300 w-fit">
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-medium text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-[#888] leading-relaxed text-sm font-light group-hover:text-[#aaa] transition-colors">
        {desc}
      </p>

      {/* Corner Tech Decoration */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PiLightningDuotone className="text-[#39FF14]" />
      </div>
    </div>
  </motion.div>
)

const VisionMissionSection = () => {    
  const containerRef = useRef(null)
  const textRef = useRef(null)
  
  // Smooth Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })   
  
  const smoothY = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 })
  
  // Parallax Transforms
  const leftColY = useTransform(smoothY, [0, 1], [0, -100]) // Text moves slower
  const rightColY = useTransform(smoothY, [0, 1], [100, -50]) // Cards move faster
  const opacity = useTransform(smoothY, [0, 0.2, 0.8, 1], [0, 1, 1, 0])                   
  
  const missions = [
    {
      icon: PiCpuDuotone,
      title: "Neural Transaction Analysis",
      description: "Proprietary AI algorithms scan 50,000+ tps to identify whale movements and institutional flows before they impact the charts.",
    },
    {
      icon: PiChartLineUpDuotone,
      title: "Predictive Market Alpha", 
      description: "Don't just track the market—anticipate it. Our predictive models utilize historical on-chain data to forecast trend reversals.",
    },
    {
      icon: PiShieldCheckDuotone,
      title: "Sentinel Security Alerts",
      description: "Real-time anomaly detection system that instantly flags rug-pull patterns, liquidity drains, and suspicious contract interactions.",
    },
    {
      icon: PiTelegramLogoDuotone,
      title: "Integrated Mini-App",
      description: "Zero friction. Access institutional-grade terminal data directly through your Telegram messenger with push notifications.",
    }
  ]

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-[#030303] overflow-hidden"
    >
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radar Scan Effect */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full border border-white/5 opacity-20 animate-[spin_20s_linear_infinite]">
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-[#39FF14]" />
        </div>
        
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-12"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* --- LEFT COLUMN: THE MANIFESTO (Sticky/Parallax) --- */}
          <motion.div 
            ref={textRef}
            style={{ y: leftColY }}
            className="lg:sticky lg:top-32"
          >
            {/* Tagline */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ duration: 1 }}
              className="h-[1px] bg-[#39FF14] mb-8"
            />
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-mono text-[#39FF14] tracking-[0.3em] uppercase mb-4">
                Core Philosophy
              </h2>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-8">
                Visualizing the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#888] to-transparent">
                  Invisible Market.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8 max-w-lg"
            >
              <p className="text-lg text-[#888] leading-relaxed font-light">
                We believe financial intelligence is the ultimate equalizer. In a world of noise, 
                <span className="text-white"> WLFI </span> acts as your signal processor.
              </p>
              
              <p className="text-lg text-[#888] leading-relaxed font-light">
                Our protocol decodes the chaotic stream of global blockchain transactions into 
                actionable, high-fidelity insights—giving you the clarity of an institutional desk 
                from the comfort of your device.
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-light text-white mb-1">50K+</div>
                  <div className="text-xs text-[#555] font-mono uppercase tracking-wider">Signals Processed</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1">24/7</div>
                  <div className="text-xs text-[#555] font-mono uppercase tracking-wider">Uptime Monitoring</div>
                </div>
              </div>

              {/* Magnetic CTA */}
              <div className="pt-8">
                <a href="https://t.me/WLFIai_bot/live" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden flex items-center gap-3"
                  >
                    <span className="relative z-10">Start Analyzing</span>
                    <PiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-[#39FF14] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT COLUMN: STRATEGIC PILLARS (Grid) --- */}
          <motion.div 
            style={{ y: rightColY }}
            className="space-y-8"
          >
            {/* Header for Right Col */}
            <div className="flex items-center gap-4 mb-12 opacity-50">
               <PiTargetDuotone className="text-[#39FF14] text-2xl" />
               <span className="text-sm font-mono text-white tracking-widest uppercase">System Capabilities</span>
               <div className="flex-1 h-[1px] bg-white/20" />
            </div>

            <div className="grid gap-6">
               {/* Map through missions */}
               {missions.map((mission, index) => (
                 <GlowingCard 
                   key={index}
                   {...mission}
                   delay={index * 0.1}
                 />
               ))}
            </div>

            {/* Decorative Code Block at bottom */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 font-mono text-xs text-[#444] mt-8"
            >
              <div className="flex gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
              <p>{`> Initializing neural_net_v2...`}</p>
              <p>{`> Connecting to mainnet nodes [100%]`}</p>
              <p className="text-[#39FF14]">{`> System Ready. Listening for alpha.`}</p>
            </motion.div>

          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}

export default VisionMissionSection