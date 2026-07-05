'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const models = [
  {
    id: "01",
    title: "1-to-1 Discovery",
    subtitle: "The Flagship Mentorship",
    desc: "An intensive, highly personalized journey. We don't just ask what a student wants to be; we uncover what they are uniquely wired to excel at.",
    details: [
      "Deep Psychometric Profiling (Cognitive & Emotional)",
      "Parent-Student Alignment Counseling",
      "Bespoke Career Blueprint Generation",
      "Absolute Clarity on Stream Selection"
    ],
    bg: "bg-[#1a1a1a]",
    text: "text-white",
    accent: "text-[#c5a059]"
  },
  {
    id: "02",
    title: "School Integration",
    subtitle: "Institutional Partnerships",
    desc: "We partner with elite educational institutions to conduct mass-awareness seminars, ensuring no student enters high school blind to their options.",
    details: [
      "Industry Awareness Seminars (Class 6-10)",
      "Stream Selection Workshops",
      "Faculty Training for Basic Guidance",
      "Mass Aptitude Testing"
    ],
    bg: "bg-[#faf9f6]",
    text: "text-[#1a1a1a]",
    accent: "text-[#c5a059]"
  },
  {
    id: "03",
    title: "Strategic Roadmapping",
    subtitle: "The Execution Phase",
    desc: "Discovery is only the first step. Once the ideal career is mapped, we build a multi-year execution strategy detailing exact subjects and exams.",
    details: [
      "College & University Targeting",
      "Entrance Exam Timeline Management",
      "Extra-curricular Profile Building",
      "Continuous Alumni Mentorship"
    ],
    bg: "bg-[#2c2c2c]",
    text: "text-white",
    accent: "text-[#c5a059]"
  }
]

export default function BusinessPage() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // We use CSS sticky for flawless pinning, and GSAP only for the visual scale/blur effect
    const cards = gsap.utils.toArray('.presentation-card')
    
    cards.forEach((card, i) => {
      // Scale down and fade previous cards as new ones scroll over
      if (i < cards.length - 1) {
        // Find the inner content to scale, so the sticky container itself doesn't shrink
        const innerContent = card.querySelector('.card-inner')
        
        gsap.to(innerContent, {
          scale: 0.85,
          opacity: 0,
          filter: "blur(10px)",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        })
      }
    })
  }, { scope: containerRef })

  return (
    <div className="bg-[#1a1a1a] min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-[#333]">
        <img src="/hero_business.png" alt="Guidance Models" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#1a1a1a]" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-[#c5a059] uppercase tracking-[0.4em] font-bold text-xs mb-6">Our Operations</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight">
            Guidance <br/><span className="text-[#c5a059] italic">Models</span>
          </h1>
          <p className="text-gray-300 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Scroll down to explore how we deliver our elite career counseling services through personalized sessions and institutional partnerships.
          </p>
          <div className="mt-12 flex justify-center">
             <div className="w-[1px] h-24 bg-gradient-to-b from-[#c5a059] to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Presentation Stacking Cards */}
      <div ref={containerRef} className="relative w-full pb-32">
        {models.map((model, idx) => (
          <section 
            key={idx} 
            className={`presentation-card sticky top-0 min-h-screen md:h-screen py-24 md:py-0 w-full flex flex-col md:flex-row items-center justify-center ${model.bg} ${model.text} overflow-y-auto overflow-x-hidden`}
            style={{ zIndex: idx }}
          >
            <div className="card-inner max-w-7xl w-full mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              
              {/* Left Side: Number & Title */}
              <div className="relative">
                <span className={`${model.accent} text-[150px] md:text-[250px] font-serif absolute -top-20 -left-10 md:-left-20 opacity-10 font-bold select-none leading-none`}>
                  {model.id}
                </span>
                <div className="relative z-10">
                  <p className={`${model.accent} uppercase tracking-[0.3em] font-bold text-sm mb-4`}>{model.subtitle}</p>
                  <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">{model.title}</h2>
                  <div className={`w-24 h-[2px] ${idx === 1 ? 'bg-[#1a1a1a]' : 'bg-white'} opacity-20 mb-8`}></div>
                  <p className="font-light text-lg md:text-xl leading-relaxed opacity-90">
                    {model.desc}
                  </p>
                </div>
              </div>

              {/* Right Side: Details List */}
              <div className="relative">
                <div className={`absolute inset-0 ${idx === 1 ? 'border-[#1a1a1a]' : 'border-white'} border opacity-10 -translate-x-4 -translate-y-4`}></div>
                <div className={`relative p-10 md:p-16 ${idx === 1 ? 'bg-white shadow-2xl' : 'bg-[#222] border border-[#333]'}`}>
                  <h3 className="text-2xl font-serif mb-8">Program Inclusions:</h3>
                  <ul className="space-y-6">
                    {model.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-4">
                        <div className={`mt-1.5 w-2 h-2 rounded-full ${idx === 1 ? 'bg-[#c5a059]' : 'bg-[#c5a059]'}`}></div>
                        <span className="text-lg font-light tracking-wide">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-12 pt-8 border-t border-opacity-10 border-current">
                    <Link href="/contact" className={`uppercase text-xs tracking-[0.2em] font-bold ${model.accent} hover:opacity-70 transition-opacity flex items-center gap-4`}>
                      Inquire About This Model
                      <span className="w-8 h-[1px] bg-current"></span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* Outro CTA */}
      <section className="h-[50vh] flex items-center justify-center bg-[#faf9f6] text-center border-t border-[#e5e0d8] relative z-50">
        <div className="max-w-2xl px-8">
          <h2 className="text-4xl font-serif text-[#1a1a1a] mb-6">Ready to find <span className="text-[#c5a059] italic">Clarity?</span></h2>
          <Link href="/contact" className="inline-block px-12 py-5 bg-[#1a1a1a] text-white uppercase text-sm tracking-widest font-bold hover:bg-[#c5a059] transition-colors shadow-xl">
            Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  )
}
