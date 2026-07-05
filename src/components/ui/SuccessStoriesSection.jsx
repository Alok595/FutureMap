'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'

export default function SuccessStoriesSection() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch('/api/public/get-stories')
        if (res.ok) {
          const data = await res.json()
          setStories(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  if (loading) {
    return (
      <section className="py-32 px-8 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-[#c5a059] animate-pulse">Loading Testimonials...</h2>
           </div>
        </div>
      </section>
    )
  }

  if (stories.length === 0) return null; // Don't show section if no stories exist

  return (
    <section className="py-32 px-8 bg-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold text-xs mb-3">Clarity Found</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Words of <span className="text-[#c5a059] italic">Gratitude</span></h2>
          <div className="w-16 h-[2px] bg-[#c5a059] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {stories.map((testimonial, i) => (
            <motion.div 
              key={testimonial._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-[#2c2c2c] p-12 border border-[#333] hover:border-[#c5a059] transition-colors relative group flex flex-col h-full"
            >
              <FaQuoteLeft className="text-4xl text-[#c5a059]/20 absolute top-8 left-8 group-hover:text-[#c5a059]/40 transition-colors" />
              
              {/* Optional Video Thumbnail if it exists */}
              {testimonial.videoReel && (
                <div className="mb-6 mt-4 z-10 relative rounded overflow-hidden aspect-video bg-black border border-[#333]">
                  <video src={testimonial.videoReel} controls className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-[#ccc] text-lg font-light leading-relaxed mb-8 relative z-10 italic flex-grow">
                "{testimonial.testimonial}"
              </p>
              <div className="relative z-10 flex items-center gap-4 mt-auto">
                {testimonial.image && (
                  <img src={testimonial.image} alt={testimonial.studentName} className="w-12 h-12 rounded-full object-cover border border-[#c5a059]" />
                )}
                <div>
                  <h4 className="text-white font-serif text-xl">{testimonial.studentName}</h4>
                  <p className="text-[#c5a059] text-xs uppercase tracking-widest mt-1 font-bold">
                    {testimonial.university} {testimonial.course ? `• ${testimonial.course}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
