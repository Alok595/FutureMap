'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BlogPreviewSection() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/public/get-blogs?limit=2')
        if (res.ok) {
          const data = await res.json()
          setBlogs(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-[#c5a059] animate-pulse">Loading Journal...</h2>
        </div>
      </section>
    )
  }

  // Fallback to dummy data only if database is completely empty so section doesn't disappear
  const displayBlogs = blogs.length > 0 ? blogs : [
    { title: "Why Engineering isn't the only path for Science students", createdAt: "2024-08-12T00:00:00.000Z", coverImage: "/hero_jee_real.png", slug: "engineering-not-only-path" },
    { title: "The Silent Rise of Design: Why UCEED is the New Standard", createdAt: "2024-09-04T00:00:00.000Z", coverImage: "/hero_uceed_real.png", slug: "silent-rise-design" }
  ]

  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold text-xs mb-3">Editorial Insights</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">From The <span className="text-[#c5a059] italic">Journal</span></h2>
          </div>
          <Link href="/blog" className="inline-block text-[#1a1a1a] uppercase text-sm tracking-widest font-bold border-b-2 border-[#1a1a1a] hover:text-[#c5a059] hover:border-[#c5a059] transition-colors pb-1">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayBlogs.map((post, idx) => (
            <Link href={`/blog/${post.slug || '#'}`} key={idx} className="group block">
              <div className="relative h-[300px] overflow-hidden mb-6 border border-[#e5e0d8] shadow-md group-hover:border-[#c5a059] transition-colors bg-gray-100">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <p className="text-[#c5a059] text-xs uppercase tracking-widest font-bold mb-3">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h3 className="text-2xl font-serif text-[#1a1a1a] group-hover:text-[#c5a059] transition-colors leading-snug">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
