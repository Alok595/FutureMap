'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';

export default function NewMentorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', expertise: '', bio: '', linkedinUrl: '' });
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
      const res = await fetch('/api/admin/add-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to create mentor');
      }

      router.push('/admin/mentors');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/mentors" className="text-[#666] hover:text-[#1a1a1a]">← Back</Link>
        <h2 className="text-3xl font-serif text-[#1a1a1a]">Add New Mentor</h2>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#e5e0d8] shadow-sm">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Mentor Name</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
                placeholder="Dr. Jane Doe"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Expertise / Title</label>
              <input 
                type="text" name="expertise" required value={formData.expertise} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
                placeholder="JEE Advanced Expert"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Profile Picture</label>
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "FuturPath"}
              onSuccess={(result) => setImageUrl(result.info.secure_url)}
            >
              {({ open }) => {
                return (
                  <div className="flex items-center gap-4">
                    {imageUrl ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#c5a059]">
                        <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#faf9f6] border border-[#e5e0d8] flex items-center justify-center">
                        <span className="text-[#999] text-xs">No img</span>
                      </div>
                    )}
                    <button type="button" onClick={() => open()} className="bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors">
                      {imageUrl ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">LinkedIn URL (Optional)</label>
            <input 
              type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Biography</label>
            <textarea 
              name="bio" required rows={5} value={formData.bio} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              placeholder="Write a short bio about this mentor..."
            />
          </div>

          <div className="pt-6 border-t border-[#e5e0d8]">
            <button type="submit" disabled={loading} className="bg-[#c5a059] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Mentor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
