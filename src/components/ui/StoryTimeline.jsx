'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const timelineData = [
  {
    title: 'The Genesis',
    desc: 'FutureMap was founded upon witnessing a systemic flaw in education: brilliant students were working incredibly hard for exams without actually knowing why. We realized the missing link wasn\'t better coaching—it was early career clarity.',
    year: '2020'
  },
  {
    title: 'The Expansion',
    desc: 'We began mapping out exhaustive career trees—linking core high school interests directly to specific degrees, and subsequently to modern industries like AI, Biotechnology, and Public Policy. Our 1-on-1 discovery sessions quickly became the gold standard for student guidance.',
    year: '2023'
  },
  {
    title: 'The Methodology Shift',
    desc: 'To eliminate all guesswork, we integrated deep psychometric profiling into our counseling. We partnered with top-tier industrial psychologists to create an assessment model that accurately predicts long-term career satisfaction based on cognitive traits.',
    year: '2024'
  },
  {
    title: 'The Global Reach',
    desc: 'As our domestic success grew, we expanded our pathways globally. We now map exact blueprints for students aspiring to join Ivy League institutions, Oxford, Cambridge, and the world\'s most elite design schools.',
    year: '2025'
  },
  {
    title: 'The Future',
    desc: 'Today, FutureMap acts as the ultimate compass. We sit at the intersection of psychology, education, and industry, guiding the next generation to choose their paths with absolute precision and unshakeable confidence.',
    year: 'Beyond'
  }
]

export default function StoryTimeline() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // 1. Animate the glowing golden line drawing downwards on scroll
    gsap.fromTo('.timeline-line', 
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 70%',
          scrub: 1,
        }
      }
    )

    // 2. Animate each story section fading and sliding up
    const sections = gsap.utils.toArray('.timeline-section')
    sections.forEach((sec) => {
      
      const dot = sec.querySelector('.timeline-dot')
      const content = sec.querySelector('.timeline-content')

      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(content, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section className="bg-[#faf9f6] py-32 border-t border-[#e5e0d8]">
      <div className="text-center mb-24">
        <p className="text-[#c5a059] uppercase tracking-[0.2em] font-bold text-sm mb-4">The Journey</p>
        <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a]">Our <span className="text-[#c5a059] italic">Story</span></h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8" ref={containerRef}>
        <div className="relative pl-8 md:pl-24 py-10">
          
          {/* Static background track line */}
          <div className="absolute left-[11px] md:left-[47px] top-0 bottom-0 w-[2px] bg-[#e5e0d8]"></div>
          
          {/* Animated golden thread line */}
          <div className="timeline-line absolute left-[11px] md:left-[47px] top-0 w-[2px] bg-gradient-to-b from-[#c5a059] via-[#d4af37] to-[#c5a059] origin-top shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>

          {timelineData.map((item, i) => (
            <div key={i} className="timeline-section relative mb-32 md:mb-40 last:mb-0">
              
              {/* Glowing animated dot */}
              <div className="timeline-dot absolute -left-[33px] md:-left-[73px] top-2 w-6 h-6 rounded-full bg-[#faf9f6] border-4 border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.5)] z-10"></div>
              
              {/* Fading text content */}
              <div className="timeline-content relative z-10">
                <span className="text-[#c5a059] text-5xl md:text-9xl font-serif absolute -top-8 md:-top-12 -left-4 md:-left-12 opacity-5 font-bold select-none">{item.year}</span>
                <p className="text-[#c5a059] uppercase tracking-[0.2em] font-bold text-xs md:text-sm mb-2 relative">{item.year}</p>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4 md:mb-6 relative">{item.title}</h3>
                <p className="text-[#666] font-light leading-relaxed text-base md:text-xl max-w-2xl relative">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  )
}
