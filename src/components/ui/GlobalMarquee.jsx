'use client'

export default function GlobalMarquee() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[40px] overflow-hidden bg-[#c5a059] text-white flex items-center z-[100] shadow-md">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat content for infinite scroll effect */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-8 px-4 uppercase tracking-[0.2em] text-xs font-bold">
            <span>Career Path Discovery</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>Psychometric Profiling</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>Engineering Pathways</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>Medical Sciences</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          </div>
        ))}
      </div>
    </div>
  )
}
