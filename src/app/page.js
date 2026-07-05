'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaQuoteLeft } from 'react-icons/fa'
import ReelsSection from "@/components/ui/ReelsSection"
import SuccessStoriesSection from "@/components/ui/SuccessStoriesSection"
import BlogPreviewSection from "@/components/ui/BlogPreviewSection"

const heroSlides = [
  { id: 1, image: '/hero_jee_real.png', title: 'Discover Engineering', subtitle: 'Tech Pathways', color: 'text-[#c5a059]' },
  { id: 2, image: '/hero_neet_real.png', title: 'Explore Medicine', subtitle: 'Life Sciences', color: 'text-[#c5a059]' },
  { id: 3, image: '/hero_uceed_real.png', title: 'Design Your Future', subtitle: 'Creative Arts', color: 'text-[#c5a059]' }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative bg-[#faf9f6] text-[#2c2c2c] font-sans">
      
      {/* Hero Section with Slideshow */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.img
            key={currentSlide}
            src={heroSlides[currentSlide].image}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-black/40" />
        
        <motion.div 
          className="relative z-10 text-center px-4 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold text-sm mb-4">
            {heroSlides[currentSlide].subtitle}
          </p>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-xl">
            Map Your Path With <br/>
            <span className={heroSlides[currentSlide].color + " italic"}>Clarity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Exclusive career guidance and path discovery. We analyze your core interests and map out the exact academic journey required to achieve your dream career.
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/contact" className="px-10 py-4 bg-[#c5a059] hover:bg-[#b08d4a] text-white uppercase text-sm tracking-widest font-bold transition-all shadow-lg hover:shadow-[#c5a059]/40">
              Start Your Discovery
            </Link>
            <Link href="/domains" className="px-10 py-4 bg-transparent border border-white hover:bg-white hover:text-black text-white uppercase text-sm tracking-widest font-bold transition-all">
              Explore Paths
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-24 px-8 bg-white text-center border-b border-[#e5e0d8]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold text-xs mb-3">Welcome to FutureMap</p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-8"
          >
            An Elite Consultancy for <span className="text-[#c5a059] italic">Extraordinary</span> Futures.
          </motion.h2>
          <p className="text-[#666] font-light leading-relaxed mb-10 text-lg">
            We specialize in highly personalized, one-to-one career counseling. We don't just teach for exams; we help students discover what they are truly passionate about, and then construct a definitive roadmap to get them there.
          </p>
          <Link href="/about" className="text-[#1a1a1a] uppercase text-sm tracking-widest font-bold hover:text-[#c5a059] transition-colors border-b-2 border-[#c5a059] pb-1">
            Discover Our Philosophy
          </Link>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-20 bg-[#1a1a1a] text-white border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { number: "10k+", label: "Careers Mapped" },
            { number: "50+", label: "Unique Pathways" },
            { number: "100%", label: "Clarity Rate" },
            { number: "Class 6+", label: "Early Discovery" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <h3 className="text-5xl font-serif text-[#c5a059] mb-2">{stat.number}</h3>
              <p className="text-sm uppercase tracking-widest font-bold text-[#999]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reels / Our Work Section */}
      <ReelsSection />

      {/* Services Section */}
      <section className="py-32 px-8 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 border border-[#c5a059] -translate-x-4 -translate-y-4"></div>
            <div className="relative bg-white p-12 shadow-2xl z-10 border border-[#e5e0d8]">
              <h3 className="text-3xl font-serif text-[#1a1a1a] mb-6">Discover Early. <br/><span className="text-[#c5a059] italic">Succeed Forever.</span></h3>
              <p className="text-[#666] leading-relaxed font-light text-lg">We recommend starting our discovery sessions from Class 6 to expose young minds to the vast array of modern career possibilities before the pressure of high school begins.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold text-xs mb-3">The Experience</p>
            <motion.h2 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-serif mb-8 leading-tight text-[#1a1a1a]"
            >
              Bespoke <br/>
              <span className="text-[#c5a059] italic">Career</span> Counseling
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[#666] text-lg mb-10 font-light leading-relaxed"
            >
              Whether you are confused about subject streams or entirely unaware of what careers exist, our expert counselors sit down with you 1-on-1 to align your natural talents with real-world industries.
            </motion.p>
            <ul className="space-y-6 mb-12">
              {['Psychometric Profiling', 'Industry Elaboration', 'Academic Roadmapping'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[#444] text-sm uppercase tracking-wider font-bold">
                  <div className="w-1.5 h-1.5 bg-[#c5a059]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/business" className="inline-block px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white uppercase text-sm tracking-widest font-bold transition-all">
              View Our Models
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 px-8 bg-white border-t border-[#e5e0d8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold text-xs mb-3">Our Methodology</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">The Path to <span className="text-[#c5a059] italic">Clarity</span></h2>
            <div className="w-16 h-[2px] bg-[#c5a059] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-[1px] bg-[#e5e0d8] -z-10"></div>
            
            {[
              { step: '01', title: 'Interest Assessment', desc: 'Through deep 1-on-1 conversation and psychometric profiling, we uncover the student’s true passions and cognitive strengths.' },
              { step: '02', title: 'Path Elaboration', desc: 'We showcase exactly what careers exist. If you choose Science, we reveal the 50+ diverse paths available beyond just traditional engineering.' },
              { step: '03', title: 'Strategic Roadmap', desc: 'Once a path is chosen, we map out the exact subjects, entrance exams, and colleges required to make that career a reality.' }
            ].map((method, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="text-center bg-white"
              >
                <div className="w-24 h-24 mx-auto bg-[#faf9f6] border border-[#e5e0d8] rounded-full flex items-center justify-center mb-8 shadow-sm">
                  <span className="text-2xl font-serif text-[#c5a059] italic">{method.step}</span>
                </div>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-4">{method.title}</h3>
                <p className="text-[#666] font-light leading-relaxed">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <SuccessStoriesSection />


      {/* Blog Preview Section */}
      <BlogPreviewSection />

      {/* Contact CTA Section */}
      <section className="py-32 px-8 bg-[#faf9f6] text-center border-t border-[#e5e0d8]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-6">Find Your <span className="text-[#c5a059] italic">True Path</span></h2>
          <p className="text-[#666] font-light leading-relaxed mb-10 text-lg">
            Stop guessing about your future. Our expert counselors are ready to help you discover exactly what you were meant to do.
          </p>
          <Link href="/contact" className="px-12 py-5 bg-[#1a1a1a] text-white uppercase text-sm tracking-widest font-bold hover:bg-[#c5a059] transition-colors inline-block shadow-xl">
            Book a Counseling Session
          </Link>
        </div>
      </section>
    </div>
  )
}
