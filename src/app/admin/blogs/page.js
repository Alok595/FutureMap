'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/admin/get-blogs');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const res = await fetch(`/api/admin/delete-blog?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog');
      
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">Editorials & Blogs</h2>
          <p className="text-[#666]">Manage your platform's written content and articles.</p>
        </div>
        <Link href="/admin/blogs/new" className="bg-[#1a1a1a] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors">
          + Write New Post
        </Link>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 text-xs font-bold uppercase">{error}</div>}
      
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-10 bg-[#e5e0d8] rounded w-full"></div>
            <div className="h-10 bg-[#e5e0d8] rounded w-full"></div>
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white p-12 text-center border border-[#e5e0d8] rounded-lg">
          <div className="text-[#999] mb-4 text-4xl">✍️</div>
          <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">No Articles Found</h3>
          <p className="text-[#666] mb-6">Start writing your first editorial piece.</p>
          <Link href="/admin/blogs/new" className="text-[#c5a059] font-bold uppercase text-xs tracking-widest hover:text-[#1a1a1a]">
            Create a post →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#e5e0d8] rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf9f6] border-b border-[#e5e0d8]">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#999]">Title</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#999]">Author</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#999]">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#999] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e0d8]">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-[#faf9f6] transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-[#1a1a1a] mb-1">{blog.title}</div>
                    <div className="text-xs text-[#999] font-mono">/{blog.slug}</div>
                  </td>
                  <td className="p-4 text-sm text-[#666]">{blog.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/blogs/${blog._id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[#999] hover:bg-gray-100 hover:text-[#c5a059] transition-colors mr-2">
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(blog._id)} className="inline-flex items-center justify-center w-8 h-8 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
