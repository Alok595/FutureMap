'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';

export default function NewBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', slug: '', author: 'FutureMap Editorial', content: '' });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/add-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, coverImage: imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create blog');
      }

      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blogs" className="text-[#666] hover:text-[#1a1a1a]">← Back</Link>
        <h2 className="text-3xl font-serif text-[#1a1a1a]">Write New Editorial</h2>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#e5e0d8] shadow-sm">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Article Title</label>
              <input 
                type="text" name="title" required value={formData.title} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-4 text-lg font-serif focus:outline-none focus:border-[#c5a059]"
                placeholder="The Future of Engineering in 2026"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Custom URL Slug (Optional)</label>
              <input 
                type="text" name="slug" value={formData.slug} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059] font-mono"
                placeholder="future-of-engineering"
              />
              <p className="text-[10px] text-[#999] mt-1">Leave blank to auto-generate from title.</p>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Author Name</label>
              <input 
                type="text" name="author" required value={formData.author} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Cover Image (Hero)</label>
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "FuturPath"}
              onSuccess={(result) => setImageUrl(result.info.secure_url)}
            >
              {({ open }) => {
                return (
                  <div className="flex flex-col items-start gap-4">
                    {imageUrl ? (
                      <div className="w-full h-48 rounded overflow-hidden border border-[#e5e0d8]">
                        <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-24 border-2 border-dashed border-[#e5e0d8] bg-[#faf9f6] flex flex-col items-center justify-center text-[#999] p-4 rounded">
                        <span className="text-xs">No cover image selected</span>
                      </div>
                    )}
                    <button type="button" onClick={() => open()} className="bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors">
                      {imageUrl ? 'Change Cover Image' : 'Upload Cover Image'}
                    </button>
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Article Content (Markdown/HTML supported)</label>
            <textarea 
              name="content" required rows={15} value={formData.content} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-4 text-sm focus:outline-none focus:border-[#c5a059] font-mono leading-relaxed"
              placeholder="Write your article content here..."
            />
          </div>

          <div className="pt-6 border-t border-[#e5e0d8]">
            <button type="submit" disabled={loading} className="bg-[#c5a059] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50">
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
