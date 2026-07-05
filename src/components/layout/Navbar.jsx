'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Domains', path: '/domains' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Business Models', path: '/business' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[40px] left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-[#faf9f6]/90 backdrop-blur-xl border-b border-[#e5e0d8] shadow-sm"
      >
        <Link href="/" className="flex items-center gap-3 relative z-[60] group" onClick={() => setIsOpen(false)}>
          {/* Geometric Compass Logo */}
          <div className="w-8 h-8 md:w-10 md:h-10 relative flex-shrink-0 transition-transform duration-700 group-hover:rotate-90">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              <path d="M50 0L65 35L100 50L65 65L50 100L35 65L0 50L35 35L50 0Z" fill="#1a1a1a" />
              <path d="M50 20L58 42L80 50L58 58L50 80L42 58L20 50L42 42L50 20Z" fill="#c5a059" />
              <circle cx="50" cy="50" r="8" fill="#faf9f6" />
            </svg>
          </div>
          <span className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
            Future<span className="text-[#c5a059] italic">Map</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-xs font-bold text-[#4a4a4a] uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              href={link.path} 
              className={`hover:text-[#c5a059] transition-colors duration-300 ${pathname === link.path ? 'text-[#c5a059]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-[60]">
          
          <div className="hidden md:flex items-center gap-4">
            {!session && (
              <Link 
                href="/login"
                className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] bg-transparent border border-[#1a1a1a] rounded-none hover:bg-[#1a1a1a] hover:text-[#faf9f6] transition-colors duration-500 shadow-sm"
              >
                Login
              </Link>
            )}
            <Link href="/contact" className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#faf9f6] bg-[#1a1a1a] rounded-none hover:bg-[#c5a059] transition-colors duration-500 shadow-md">
              Get Guidance
            </Link>
          </div>

          {/* Profile Dropdown visible on both desktop and mobile */}
          {status === 'loading' ? (
            <div className="w-6 h-6 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
          ) : session ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#c5a059] focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:ring-offset-2 transition-shadow"
              >
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs md:text-sm">{session.user.name?.[0]}</div>
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-[#e5e0d8] z-50">
                  <div className="px-4 py-3 border-b border-[#e5e0d8] mb-1">
                    <p className="text-sm font-bold text-[#1a1a1a] truncate">{session.user.name}</p>
                    <p className="text-xs text-[#666] truncate">{session.user.email}</p>
                  </div>
                  {session.user?.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-2 text-sm text-[#c5a059] font-bold hover:bg-[#faf9f6]"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                  >
                    Logout completely
                  </button>
                </div>
              )}
            </div>
          ) : null}
          
          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`bg-[#1a1a1a] block transition-all duration-300 ease-out h-[2px] w-full rounded-sm ${isOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'}`}></span>
            <span className={`bg-[#1a1a1a] block transition-all duration-300 ease-out h-[2px] w-full rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-[#1a1a1a] block transition-all duration-300 ease-out h-[2px] w-full rounded-sm ${isOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] bg-[#faf9f6] pt-32 px-8 flex flex-col"
          >
            <div className="flex flex-col space-y-8 mt-10">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.path} 
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-serif block ${pathname === link.path ? 'text-[#c5a059]' : 'text-[#1a1a1a]'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              {session?.user?.role === 'admin' && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link 
                    href="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif block text-[#c5a059]"
                  >
                    Admin Panel
                  </Link>
                </motion.div>
              )}
              {!session && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif block text-[#1a1a1a]"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
            
            <div className="mt-auto pb-12 w-full">
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-4 text-sm font-bold uppercase tracking-widest text-[#faf9f6] bg-[#1a1a1a] rounded-none hover:bg-[#c5a059] transition-colors shadow-md"
              >
                Get Guidance
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
