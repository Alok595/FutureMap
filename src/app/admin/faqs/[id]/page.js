'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditFAQPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [formData, setFormData] = useState({ question: '', answer: '', category: 'General' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFAQ() {
      try {
        const res = await fetch('/api/admin/get-faqs');
        if (!res.ok) throw new Error('Failed to fetch FAQs');
        const data = await res.json();
        const faq = data.find(f => f._id === id);
        
        if (!faq) throw new Error('FAQ not found');
        
        setFormData({
          question: faq.question || '',
          answer: faq.answer || '',
          category: faq.category || 'General'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchFAQ();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/update-faq?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update FAQ');
      }

      router.push('/admin/faqs');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8 text-center text-[#999]">Loading FAQ data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/faqs" className="text-[#666] hover:text-[#1a1a1a]">← Back</Link>
        <h2 className="text-3xl font-serif text-[#1a1a1a]">Edit FAQ</h2>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#e5e0d8] shadow-sm">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Category</label>
            <select 
              name="category" required value={formData.category} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
            >
              <option value="General">General</option>
              <option value="Admissions">Admissions</option>
              <option value="Counseling">Counseling</option>
              <option value="Psychometric Test">Psychometric Test</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Question</label>
            <input 
              type="text" name="question" required value={formData.question} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              placeholder="e.g. How do I book a counseling session?"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-2">Answer</label>
            <textarea 
              name="answer" required rows={5} value={formData.answer} onChange={handleChange}
              className="w-full bg-[#faf9f6] border border-[#e5e0d8] p-3 text-sm focus:outline-none focus:border-[#c5a059]"
              placeholder="Provide a clear, helpful answer..."
            />
          </div>

          <div className="pt-6 border-t border-[#e5e0d8]">
            <button type="submit" disabled={loading} className="bg-[#c5a059] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50">
              {loading ? 'Updating...' : 'Update FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
