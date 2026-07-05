'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';

export default function NewSuccessStoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ studentName: '', university: '', course: '', testimonial: '' });
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
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
      const res = await fetch('/api/admin/add-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imageUrl, videoReel: videoUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to create success story');
      }

      router.push('/admin/success-stories');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/success-stories" className="text-[#666] hover:text-[#1a1a1a]">← Back</Link>
        <h2 className="text-3xl font-serif text-[#1a1a1a]">Add Success Story</h2>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#e5e0d8] shadow-sm">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Student Name</label>
              <input 
                type="text" name="studentName" required value={formData.studentName} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">University (Destination)</label>
              <input 
                type="text" name="university" required value={formData.university} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
                placeholder="e.g. IIT Bombay"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Course / Major (Optional)</label>
              <input 
                type="text" name="course" value={formData.course} onChange={handleChange}
                className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Student Photo</label>
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "FuturPath"}
                onSuccess={(result) => setImageUrl(result.info.secure_url)}
              >
                {({ open }) => {
                  return (
                    <div className="flex items-center gap-4">
                      {imageUrl ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c5a059]">
                          <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#faf9f6] border border-[#e5e0d8] flex items-center justify-center">
                          <span className="text-[#999] text-[10px]">No img</span>
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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Video Testimonial (Optional)</label>
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "FuturPath"}
                options={{ maxFiles: 1, resourceType: "video" }}
                onSuccess={(result) => setVideoUrl(result.info.secure_url)}
              >
                {({ open }) => {
                  return (
                    <div className="flex items-center gap-4">
                      {videoUrl ? (
                        <div className="text-xs text-green-600 font-bold">✓ Video Uploaded</div>
                      ) : (
                        <div className="text-xs text-[#999]">No video attached</div>
                      )}
                      <button type="button" onClick={() => open()} className="bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors">
                        {videoUrl ? 'Change Video' : 'Upload Video'}
                      </button>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Testimonial Quote</label>
            <textarea 
              name="testimonial" required rows={4} value={formData.testimonial} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              placeholder="FutureMap helped me..."
            />
          </div>

          <div className="pt-6 border-t border-[#e5e0d8]">
            <button type="submit" disabled={loading} className="bg-[#c5a059] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Publish Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
