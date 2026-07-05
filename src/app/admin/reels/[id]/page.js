'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';

export default function EditReelPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReel() {
      try {
        const res = await fetch('/api/admin/get-reels');
        if (!res.ok) throw new Error('Failed to fetch reels');
        const data = await res.json();
        const reel = data.find(r => r._id === id);
        
        if (!reel) throw new Error('Reel not found');
        
        setTitle(reel.title || '');
        setVideoUrl(reel.videoUrl || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchReel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoUrl) {
      setError('You must upload a video first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/update-reel?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, videoUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to update reel');
      }

      router.push('/admin/reels');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8 text-center text-[#999]">Loading reel data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/reels" className="text-[#666] hover:text-[#1a1a1a]">← Back</Link>
        <h2 className="text-3xl font-serif text-[#1a1a1a]">Edit Video Reel</h2>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#e5e0d8] shadow-sm">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Video Title</label>
            <input 
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              placeholder="e.g. Tips for cracking JEE Mains"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Upload Video file</label>
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "FuturPath"}
              options={{ maxFiles: 1, resourceType: "video" }}
              onSuccess={(result) => setVideoUrl(result.info.secure_url)}
            >
              {({ open }) => {
                return (
                  <div className="flex flex-col items-start gap-4">
                    {videoUrl ? (
                      <div className="w-48 aspect-[9/16] bg-black rounded overflow-hidden">
                        <video src={videoUrl} controls className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-40 border-2 border-dashed border-[#e5e0d8] bg-[#faf9f6] flex flex-col items-center justify-center text-[#999] p-4 text-center rounded">
                        <p className="text-sm mb-2">MP4, WebM or OGG (Max 50MB)</p>
                      </div>
                    )}
                    <button type="button" onClick={() => open()} className="bg-[#1a1a1a] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors">
                      {videoUrl ? 'Change Video' : 'Select Video'}
                    </button>
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>

          <div className="pt-6 border-t border-[#e5e0d8]">
            <button type="submit" disabled={loading} className="bg-[#c5a059] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50">
              {loading ? 'Updating & Saving...' : 'Update Video Reel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
