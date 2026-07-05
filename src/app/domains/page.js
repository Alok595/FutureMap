'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const domainSlides = [
  { 
    title: 'Engineering Pathways', 
    subtitle: 'The Science Stream', 
    desc: 'Choosing Science opens up a massive landscape beyond just traditional Computer Science or Mechanical Engineering.', 
    details: 'We guide students through the intricate web of engineering pathways. From burgeoning fields like Artificial Intelligence, Aerospace, and Robotics, to the exact roadmap of exams required. We help you understand which colleges excel in which specific niches, ensuring your interests align perfectly with your eventual degree.',
    image: '/hero_jee_real.png',
    tags: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'State Exams']
  },
  { 
    title: 'Medical Sciences', 
    subtitle: 'Biology & Life Sciences', 
    desc: 'The medical field is incredibly vast. We help you explore options ranging from clinical practice to groundbreaking research.',
    details: 'If you have an affinity for Biology, your path is not limited to just an MBBS. We elaborate on careers in Biotechnology, Genetics, Pharmacology, Veterinary Sciences, and Psychology. We map out the exams and help you decide if you want a future in patient care, laboratory research, or medical technology.',
    image: '/hero_neet_real.png',
    tags: ['NEET UG', 'AIIMS', 'JIPMER', 'Biotech', 'BDS']
  },
  { 
    title: 'Administrative Careers', 
    subtitle: 'Governance & Policy', 
    desc: 'For students with a passion for leadership, sociology, and creating systemic change at a national level.',
    details: 'We demystify the complex world of Government and Administrative services. Whether you are interested in the IAS, IPS, Foreign Services, or State-level administration, we explain the foundational subjects you should focus on in high school and college. We outline the examination structures and what it takes to succeed in public policy.',
    image: '/hero_govt_real.png',
    tags: ['UPSC CSE', 'State PCS', 'SSC CGL', 'RBI Grade B']
  },
  { 
    title: 'Creative Arts & Design', 
    subtitle: 'Aesthetics & Innovation', 
    desc: 'Design is one of the fastest-growing sectors globally. We help creative minds find highly lucrative and fulfilling career paths.',
    details: 'If you are a visual thinker, we map out careers in Product Design, UI/UX, Architecture, Fashion, and Industrial Design. We elaborate on the portfolios required and the specific entrance exams you need to crack to enter India’s most prestigious creative institutions.',
    image: '/hero_uceed_real.png',
    tags: ['UCEED', 'NID DAT', 'NIFT', 'NATA', 'B.Arch']
  },
  { 
    title: 'Student Lifestyle', 
    subtitle: 'Holistic Development', 
    desc: 'A brilliant mind requires premium fuel and mental clarity. We extend our guidance into lifestyle habits that foster extreme focus.',
    details: 'Career discovery is mentally exhausting. As part of our holistic counseling, we guide students on cognitive nutrition—identifying superfoods that enhance neuroplasticity and eliminating habits that cause lethargy. We help you build a daily routine that balances intense academic exploration with physical and mental well-being.',
    image: '/domain_nutrition_real.png',
    tags: ['Cognitive Nutrition', 'Sleep Hygiene', 'Stress Management', 'Focus Optimization']
  }
]

export default function DomainsPage() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const panels = gsap.utils.toArray('.domain-panel')
    
    gsap.set(panels, { zIndex: (i) => i })
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=600%', 
        pin: true,
        scrub: 1,
      }
    })

    panels.forEach((panel, i) => {
      if (i !== 0) {
        gsap.set(panel, { yPercent: 100 })
        tl.to(panel, {
          yPercent: 0,
          ease: 'none'
        })
      }
    })
  }, { scope: containerRef })

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center bg-[#faf9f6]">
        <img src="/hero_about.png" alt="Career Pathways" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-8">
          <p className="text-[#c5a059] uppercase tracking-[0.2em] font-bold text-sm mb-4">Explore the Possibilities</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Career <span className="text-[#c5a059] italic">Pathways</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-200 text-lg font-light">
            Scroll down to see how we elaborate on different fields, breaking down the myriad of career options available within each major domain.
          </p>
        </div>
      </section>

      {/* GSAP Pinned Domains Section */}
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
        {domainSlides.map((domain, idx) => (
          <div 
            key={idx} 
            className="domain-panel absolute inset-0 w-full h-full flex flex-col md:flex-row items-center bg-[#faf9f6]"
          >
            {/* Content Side */}
            <div className="w-full md:w-1/2 h-[65%] md:h-full p-6 md:p-20 flex flex-col justify-center overflow-y-auto">
              <p className="text-[#c5a059] uppercase tracking-[0.2em] font-bold text-[10px] md:text-sm mb-2 md:mb-4">{domain.subtitle}</p>
              <h2 className="text-3xl md:text-7xl font-serif text-[#1a1a1a] mb-4 md:mb-8 leading-tight">
                {domain.title.split(' ')[0]} <br className="hidden md:block" />
                <span className="text-[#c5a059] italic">{domain.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-[#1a1a1a] text-xs md:text-xl font-medium leading-relaxed mb-4 md:mb-6 border-l-2 border-[#c5a059] pl-4 md:pl-6 py-2 bg-gradient-to-r from-[#c5a059]/10 to-transparent">
                {domain.desc}
              </p>
              <p className="text-[#666] text-[11px] md:text-base font-light leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                {domain.details}
              </p>
              
              {/* Tags / Badges Section */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-12">
                {domain.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 md:px-4 py-1 md:py-1.5 border border-[#c5a059]/40 text-[#c5a059] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] rounded-full bg-[#c5a059]/5 hover:bg-[#c5a059]/10 transition-colors">
                    {tag}
                  </span>
                ))}
                {domain.tags.length > 3 && (
                  <span className="px-3 md:px-4 py-1 md:py-1.5 border border-[#c5a059]/40 text-[#c5a059] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] rounded-full bg-[#c5a059]/5 block md:hidden">
                    +{domain.tags.length - 3} More
                  </span>
                )}
                {/* Desktop renders all tags */}
                {domain.tags.slice(3).map((tag, tIdx) => (
                  <span key={`desk-${tIdx}`} className="hidden md:inline-block px-4 py-1.5 border border-[#c5a059]/40 text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.15em] rounded-full bg-[#c5a059]/5 hover:bg-[#c5a059]/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <Link href="/contact" className="inline-flex items-center gap-4 group">
                  <span className="text-[#1a1a1a] uppercase text-xs md:text-sm tracking-widest font-bold group-hover:text-[#c5a059] transition-colors">
                    Map this Pathway
                  </span>
                  <div className="w-8 md:w-12 h-[1px] bg-[#1a1a1a] group-hover:bg-[#c5a059] group-hover:w-16 md:group-hover:w-20 transition-all duration-300"></div>
                </Link>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[35%] md:h-full relative overflow-hidden">
              <img 
                src={domain.image} 
                alt={domain.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#faf9f6]/90 hidden md:block" />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
