'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaHome, FaNewspaper, FaQuestionCircle, FaStar, FaUserTie, FaVideo, FaSignOutAlt, FaInbox, FaUsers, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const [openCategories, setOpenCategories] = useState({
    dashboard: true,
    data: true,
    content: true,
  });

  const toggleCategory = (category) => {
    if (effectivelyCollapsed) return; // Don't toggle when collapsed
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    // Initialize on mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectivelyCollapsed = isCollapsed && !isMobile;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [router]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'authenticated' && session?.user?.role === 'admin') {
    return (
      <div className="h-screen overflow-hidden bg-[#f4f2ec] flex font-sans">
        
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Admin Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: effectivelyCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3 }}
          className={`bg-[#1a1a1a] text-white flex flex-col h-screen fixed md:sticky top-0 left-0 z-50 border-r border-[#333] overflow-hidden flex-shrink-0 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <div className={`p-6 border-b border-[#333] flex items-center ${effectivelyCollapsed ? 'justify-center' : 'justify-between'}`}>
            <Link href="/admin" className="flex items-center gap-3 relative group" title="Dashboard">
              <div className="w-8 h-8 relative flex-shrink-0 transition-transform duration-700 group-hover:rotate-90">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                  <path d="M50 0L65 35L100 50L65 65L50 100L35 65L0 50L35 35L50 0Z" fill="#fff" />
                  <path d="M50 20L58 42L80 50L58 58L50 80L42 58L20 50L42 42L50 20Z" fill="#c5a059" />
                  <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
                </svg>
              </div>
              {!effectivelyCollapsed && (
                <span className="text-xl font-serif font-semibold tracking-tight text-white whitespace-nowrap">
                  Admin<span className="text-[#c5a059] italic">Map</span>
                </span>
              )}
            </Link>
            
            {/* Mobile Close Button */}
            <button 
              className="md:hidden text-white hover:text-[#c5a059] ml-auto"
              onClick={() => setIsMobileOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <nav data-lenis-prevent="true" className="flex-1 py-4 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-hide pb-20">
            
            {/* Dashboard Category */}
            <div>
              <div 
                className={`flex items-center justify-between px-6 mb-2 cursor-pointer group ${effectivelyCollapsed ? 'hidden' : 'flex'}`}
                onClick={() => toggleCategory('dashboard')}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#666] group-hover:text-[#c5a059] transition-colors">Dashboard</div>
                <FaChevronRight className={`text-[#666] text-[10px] transition-transform ${openCategories.dashboard ? 'rotate-90' : ''}`} />
              </div>
              
              <div className={`space-y-1 ${!openCategories.dashboard && !effectivelyCollapsed ? 'hidden' : 'block'}`}>
                <Link href="/admin" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Overview">
                  <FaHome className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Overview</span>}
                </Link>
              </div>
            </div>
            
            {/* Data & Users Category */}
            <div>
              <div 
                className={`flex items-center justify-between px-6 mb-2 mt-4 cursor-pointer group ${effectivelyCollapsed ? 'hidden' : 'flex'}`}
                onClick={() => toggleCategory('data')}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#666] group-hover:text-[#c5a059] transition-colors">Data & Users</div>
                <FaChevronRight className={`text-[#666] text-[10px] transition-transform ${openCategories.data ? 'rotate-90' : ''}`} />
              </div>
              
              <div className={`space-y-1 ${!openCategories.data && !effectivelyCollapsed ? 'hidden' : 'block'}`}>
                <Link href="/admin/leads" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Leads / Requests">
                  <FaInbox className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Leads / Requests</span>}
                </Link>

                <Link href="/admin/users" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Registered Users">
                  <FaUsers className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Registered Users</span>}
                </Link>
              </div>
            </div>

            {/* Content Management Category */}
            <div>
              <div 
                className={`flex items-center justify-between px-6 mb-2 mt-4 cursor-pointer group ${effectivelyCollapsed ? 'hidden' : 'flex'}`}
                onClick={() => toggleCategory('content')}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#666] group-hover:text-[#c5a059] transition-colors">Content Management</div>
                <FaChevronRight className={`text-[#666] text-[10px] transition-transform ${openCategories.content ? 'rotate-90' : ''}`} />
              </div>
              
              <div className={`space-y-1 ${!openCategories.content && !effectivelyCollapsed ? 'hidden' : 'block'}`}>
                <Link href="/admin/blogs" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0 mt-4' : 'px-4'}`} title="Blogs & Editorials">
                  <FaNewspaper className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Blogs & Editorials</span>}
                </Link>
                
                <Link href="/admin/faqs" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="FAQs">
                  <FaQuestionCircle className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">FAQs</span>}
                </Link>
                
                <Link href="/admin/success-stories" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Success Stories">
                  <FaStar className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Success Stories</span>}
                </Link>
                
                <Link href="/admin/mentors" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Meet Our Mentors">
                  <FaUserTie className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Meet Our Mentors</span>}
                </Link>
                
                <Link href="/admin/reels" className={`flex items-center gap-3 py-3 mx-4 rounded hover:bg-[#333] transition-colors text-white ${effectivelyCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Video Reels">
                  <FaVideo className="flex-shrink-0 text-[#c5a059]" />
                  {!effectivelyCollapsed && <span className="text-sm whitespace-nowrap">Video Reels</span>}
                </Link>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-[#333] flex flex-col gap-2">
            {/* Desktop Collapse Toggle */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden md:flex items-center gap-3 py-3 rounded hover:bg-[#333] transition-colors text-[#999] hover:text-white ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <FaChevronRight className="flex-shrink-0" /> : <FaChevronLeft className="flex-shrink-0" />}
              {!isCollapsed && <span className="text-sm whitespace-nowrap">Collapse Sidebar</span>}
            </button>
          </div>
        </motion.aside>

        {/* Admin Main Content Area */}
        <main data-lenis-prevent="true" className="flex-1 overflow-y-auto flex flex-col h-screen md:ml-0">
          {/* Topbar */}
          <header className="bg-white h-20 border-b border-[#e5e0d8] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden text-[#1a1a1a] hover:text-[#c5a059] transition-colors p-2 rounded hover:bg-[#faf9f6]"
              >
                <FaBars size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4 relative">
              <span className="text-sm font-bold text-[#1a1a1a]">{session.user.name}</span>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#c5a059] focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:ring-offset-2 transition-shadow"
              >
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white">{session.user.name?.[0]}</div>
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-[#e5e0d8] z-50">
                  <div className="px-4 py-3 border-b border-[#e5e0d8] mb-1">
                    <p className="text-sm font-bold text-[#1a1a1a] truncate">{session.user.name}</p>
                    <p className="text-xs text-[#666] truncate">{session.user.email}</p>
                  </div>
                  <Link 
                    href="/" 
                    className="block px-4 py-2 text-sm text-[#1a1a1a] hover:bg-[#faf9f6]"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Exit Admin (Go Home)
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                  >
                    Logout completely
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8 flex-1">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return null;
}
