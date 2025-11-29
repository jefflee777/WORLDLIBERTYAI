'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { 
  PiTelegramLogoDuotone, 
  PiXLogoBold, 
  PiAppStoreLogoDuotone,
  PiArrowRightBold,
  PiArrowUpRightBold
} from 'react-icons/pi'

const BottomCTASection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const actions = [
    {
      id: "telegram",
      title: "Join Our Telegram",
      desc: "Connect with the community",
      icon: PiTelegramLogoDuotone,
      link: "#",
      color: "#2AABEE"
    },
    {
      id: "twitter",
      title: "Follow on X",
      desc: "Stay updated with news",
      icon: PiXLogoBold,
      link: "#",
      color: "#FFFFFF"
    },
    {
      id: "miniapp",
      title: "Launch Mini App",
      desc: "Trade directly on Telegram",
      icon: PiAppStoreLogoDuotone,
      link: "#",
      color: "#39FF14"
    }
  ]

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-[#050505] overflow-hidden flex flex-col items-center justify-center min-h-[90vh]"
    >
      {/* --- Background VFX --- */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Radar Scanner Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#39FF14]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#39FF14]/5 rounded-full" />
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,rgba(57,255,20,0.05)_360deg)] rounded-full"
        />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6"
        style={{ y: yParallax, opacity: opacityFade }}
      >
        
        {/* --- Header Content --- */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-[#39FF14]/5 border border-[#39FF14]/10 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#39FF14]">System Online</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight leading-[1.05] mb-8">
            Join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
              Liberty Network
            </span>
          </h2>

          <p className="text-xl text-[#888] font-light leading-relaxed max-w-2xl mx-auto">
            Be part of a global movement redefining <span className="text-white">transparency</span> in financial intelligence. 
            Connect, learn, and shape the future.
          </p>
        </div>


        {/* --- Action Cards Grid --- */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-32">
          {actions.map((action, i) => (
            <CTACard key={action.id} action={action} index={i} />
          ))}
        </div>


        {/* --- Final Footer Tagline --- */}
        <div className="text-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#050505] inline-block px-8 py-2"
          >
             <p className="text-[#666] uppercase tracking-[0.2em] text-xs font-medium">
               Ready to revolutionize financial intelligence?
             </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}

// --- SUB-COMPONENT: HOLOGRAPHIC CARD ---
const CTACard = ({ action, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:border-[#39FF14]/30 group-hover:bg-[#0E0E0E] group-hover:shadow-[0_0_50px_rgba(57,255,20,0.05)] overflow-hidden">
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-[#39FF14]/20 group-hover:bg-[#39FF14]/5">
            <action.icon size={32} style={{ color: action.color }} />
          </div>
          {/* Ripple Effect behind icon */}
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl -z-10 scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700" />
        </div>

        {/* Text */}
        <div className="relative z-10 mb-10">
          <h3 className="text-2xl font-medium text-white mb-2">{action.title}</h3>
          <p className="text-[#666] text-sm group-hover:text-[#999] transition-colors">{action.desc}</p>
        </div>

        {/* Magnetic Button */}
        <div className="mt-auto w-full relative z-20">
          <MagneticButton>
            <a href={action.link} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-[#39FF14] transition-colors duration-300">
              Get Started
              <PiArrowUpRightBold />
            </a>
          </MagneticButton>
        </div>

      </div>
    </motion.div>
  )
}

// --- SUB-COMPONENT: MAGNETIC BUTTON ---
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.35);
    y.set((clientY - center.y) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: useSpring(x), y: useSpring(y) }}
    >
      {children}
    </motion.div>
  );
};

export default BottomCTASection