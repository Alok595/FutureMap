'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ({ initialFaqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="space-y-4">
      {initialFaqs.length === 0 ? (
        <div className="text-center text-[#999] py-10 border border-[#e5e0d8] bg-white">No FAQs available yet.</div>
      ) : initialFaqs.map((faq, i) => (
        <div key={i} className="border border-[#e5e0d8] bg-white overflow-hidden">
          <button 
            onClick={() => toggleFaq(i)}
            className="w-full text-left px-8 py-6 flex justify-between items-center group focus:outline-none"
          >
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a] group-hover:text-[#c5a059] transition-colors pr-8">
              {faq.question}
            </h3>
            <div className="text-[#c5a059] text-2xl font-light transform transition-transform duration-300 flex-shrink-0" style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
              +
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === i && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-8 pb-6 text-[#666] font-light leading-relaxed border-t border-[#f5f0e8] pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
