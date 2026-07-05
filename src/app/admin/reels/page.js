'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ReelsPage() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReels();
  }, []);

  async function fetchReels() {
    try {
      const res = await fetch('/api/admin/get-reels');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setReels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reel?')) return;
    
    try {
      const res = await fetch(`/api/admin/delete-reel?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete reel');
      
      setReels(reels.filter(r => r._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">Video Reels</h2>
          <p className="text-[#666]">Manage the short video reels displayed on the homepage.</p>
        </div>
        <Link href="/admin/reels/new" className="bg-[#1a1a1a] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors">
          + Add Video Reel
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
      ) : reels.length === 0 ? (
        <div className="bg-white p-12 text-center border border-[#e5e0d8] rounded-lg">
          <div className="text-[#999] mb-4 text-4xl">📱</div>
          <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">No Video Reels Found</h3>
          <p className="text-[#666] mb-6">You haven't uploaded any video reels yet.</p>
          <Link href="/admin/reels/new" className="text-[#c5a059] font-bold uppercase text-xs tracking-widest hover:text-[#1a1a1a]">
            Upload your first video →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reels.map((reel) => (
            <div key={reel._id} className="bg-white border border-[#e5e0d8] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-full aspect-[9/16] bg-black relative group">
                {reel.videoUrl ? (
                  <video src={reel.videoUrl} className="w-full h-full object-cover opacity-80" muted playsInline />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">No Video</div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <Link href={`/admin/reels/${reel._id}`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] hover:text-[#c5a059] transition-colors shadow-lg">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(reel._id)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 hover:text-red-700 transition-colors shadow-lg">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-semibold text-[#1a1a1a] truncate mb-1">{reel.title}</h4>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${reel.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {reel.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
