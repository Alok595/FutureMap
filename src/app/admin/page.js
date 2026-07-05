'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { FaUsers, FaInbox, FaNewspaper, FaUserTie, FaCheckCircle, FaVideo, FaQuestionCircle } from 'react-icons/fa';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/dashboard-stats');
      if (!res.ok) throw new Error('Failed to fetch dashboard data');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Poll every 30 seconds for real-time feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-600 rounded text-sm font-semibold">
        Error loading dashboard: {error}
      </div>
    );
  }

  const { counts, recentUsers, chartData } = stats;

  const statCards = [
    { title: 'Total Users', value: counts.totalUsers, icon: FaUsers, link: '/admin/users' },
    { title: 'Total Leads', value: counts.totalLeads, icon: FaInbox, link: '/admin/leads' },
    { title: 'Total Blogs', value: counts.totalBlogs, icon: FaNewspaper, link: '/admin/blogs' },
    { title: 'Success Stories', value: counts.totalSuccessStories, icon: FaCheckCircle, link: '/admin/success-stories' },
    { title: 'Mentors', value: counts.totalMentors, icon: FaUserTie, link: '/admin/mentors' },
    { title: 'Video Reels', value: counts.totalReels, icon: FaVideo, link: '/admin/reels' },
    { title: 'FAQs', value: counts.totalFaqs, icon: FaQuestionCircle, link: '/admin/faqs' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">Welcome back, {session?.user?.name || 'Admin'}</h2>
        <p className="text-[#666]">Here is what is happening with FutureMap today. Your data updates automatically.</p>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={stat.link} className="block h-full bg-white p-6 rounded-xl border border-[#e5e0d8] shadow-sm hover:shadow-md hover:border-[#c5a059] transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#999] group-hover:text-[#c5a059] transition-colors">{stat.title}</div>
                <stat.icon className="text-[#e5e0d8] group-hover:text-[#c5a059] transition-colors text-xl" />
              </div>
              <div className="text-3xl font-serif text-[#1a1a1a]">
                <AnimatedCounter value={stat.value || 0} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-[#e5e0d8] shadow-sm p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-serif text-[#1a1a1a]">Growth Overview</h3>
            <p className="text-xs text-[#999]">Users and Leads generated over the last 14 days</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c5a059" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="displayDate" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }}
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e0d8', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="users" name="New Users" stroke="#1a1a1a" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="leads" name="New Leads" stroke="#c5a059" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Users Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-[#e5e0d8] shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-[#e5e0d8] flex justify-between items-center bg-[#faf9f6]">
            <div>
              <h3 className="text-lg font-serif text-[#1a1a1a]">Recent Signups</h3>
              <p className="text-xs text-[#999]">Latest registered users</p>
            </div>
            <Link href="/admin/users" className="text-xs font-bold text-[#c5a059] uppercase tracking-widest hover:text-[#1a1a1a] transition-colors">
              View All
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {recentUsers.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#999]">No recent users found.</div>
            ) : (
              <div className="divide-y divide-[#e5e0d8]">
                {recentUsers.map((user) => (
                  <div key={user._id} className="p-4 flex items-center justify-between hover:bg-[#faf9f6] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e5e0d8] flex-shrink-0">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#666]">
                            {user.name?.[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#1a1a1a]">{user.name}</div>
                        <div className="text-xs text-[#666] truncate max-w-[150px]">{user.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${user.role === 'admin' ? 'bg-[#c5a059] text-white' : 'bg-[#e5e0d8] text-[#666]'}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
