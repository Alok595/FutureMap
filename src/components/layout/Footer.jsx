import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-8 py-20 border-t border-[#e5e0d8] bg-[#faf9f6] text-[#666] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-3 group mb-6 inline-flex">
            {/* Geometric Compass Logo */}
            <div className="w-8 h-8 relative flex-shrink-0 transition-transform duration-700 group-hover:rotate-90">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                <path d="M50 0L65 35L100 50L65 65L50 100L35 65L0 50L35 35L50 0Z" fill="#1a1a1a" />
                <path d="M50 20L58 42L80 50L58 58L50 80L42 58L20 50L42 42L50 20Z" fill="#c5a059" />
                <circle cx="50" cy="50" r="8" fill="#faf9f6" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif text-[#1a1a1a]">
              Future<span className="text-[#c5a059] italic">Map</span>
            </h3>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed font-light">
            An exclusive institution guiding elite students to choose their careers flawlessly across domains like JEE, NEET, Government Exams, and UCEED.
          </p>
        </div>
        <div>
          <h4 className="text-[#1a1a1a] uppercase tracking-widest text-xs font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-light flex flex-col items-start">
            <Link href="/about" className="inline-block hover:text-[#c5a059] transition-colors">About Us</Link>
            <Link href="/about" className="inline-block hover:text-[#c5a059] transition-colors">Our Story</Link>
            <Link href="/about" className="inline-block hover:text-[#c5a059] transition-colors">Our Team</Link>
            <Link href="/business" className="inline-block hover:text-[#c5a059] transition-colors">Business Models</Link>
          </ul>
        </div>
        <div>
          <h4 className="text-[#1a1a1a] uppercase tracking-widest text-xs font-bold mb-6">Connect</h4>
          <ul className="space-y-4 text-sm font-light flex flex-col items-start">
            <Link href="/contact" className="inline-block hover:text-[#c5a059] transition-colors">Contact Us</Link>
            <li className="inline-block text-[#c5a059]">concierge@futuremap.com</li>
          </ul>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-[#e5e0d8] text-center flex justify-between items-center text-xs tracking-wider uppercase">
        <p>&copy; {new Date().getFullYear()} FutureMap. All Rights Reserved.</p>
        <p>Crafted with Excellence</p>
      </div>
    </footer>
  )
}
