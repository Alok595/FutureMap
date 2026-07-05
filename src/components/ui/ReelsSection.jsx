'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function ReelsSection() {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef([])

  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch('/api/public/get-reels')
        if (res.ok) {
          const data = await res.json()
          setReels(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchReels()
  }, [])

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      video.play().catch(e => console.log("Autoplay prevented:", e))
    }
  }

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section className="py-32 px-8 bg-[#1a1a1a] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold text-xs mb-3">See Our Work</p>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">FutureMap <span className="text-[#c5a059] italic">Reels</span></h2>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onClick={toggleMute}
            className="flex items-center gap-3 px-8 py-3 bg-[#c5a059]/10 border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-[#1a1a1a] transition-all duration-300 rounded-full text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(197,160,89,0.1)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]"
          >
            {isMuted ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                Unmute Sound
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                Mute Sound
              </>
            )}
          </motion.button>
        </div>

        {/* Scrollable Reels Carousel */}
        {loading ? (
          <div className="flex gap-8 pb-12 pt-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-none w-[300px] h-[550px] rounded-[2rem] bg-black/50 animate-pulse border border-[#333]" />
            ))}
          </div>
        ) : reels.length === 0 ? (
          <div className="py-20 text-center text-[#999]">
            <p className="text-xl font-serif">No reels available right now.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel, idx) => (
              <motion.div 
                variants={itemVariants}
                key={reel._id} 
                className="relative flex-none w-[300px] h-[550px] rounded-[2rem] overflow-hidden snap-center cursor-pointer group bg-black border border-[#333] hover:border-[#c5a059] transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:-translate-y-2"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                {/* Video Element */}
                <video
                  ref={el => videoRefs.current[idx] = el}
                  src={reel.videoUrl}
                  muted={isMuted}
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                
                {/* Hover Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-90 group-hover:scale-100">
                  <div className="w-20 h-20 rounded-full bg-[#c5a059]/20 backdrop-blur-md flex items-center justify-center border border-[#c5a059]/50 shadow-[0_0_30px_rgba(197,160,89,0.5)]">
                     <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>

                {/* Title & Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-serif text-white font-bold leading-snug drop-shadow-lg">{reel.title}</h3>
                  <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-[#c5a059] text-[10px] uppercase tracking-widest font-bold">Watch Now</p>
                    <div className="w-12 h-[1px] bg-[#c5a059]"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* CSS to hide scrollbar for webkit browsers */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
      </div>
    </section>
  )
}
