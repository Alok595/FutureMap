'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/get-leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const res = await fetch(`/api/admin/delete-lead?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setLeads(leads.filter(lead => lead._id !== id));
        } else {
          alert('Failed to delete lead');
        }
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[#1a1a1a]">Leads & Requests</h2>
          <p className="text-[#666] mt-1">Manage guidance requests submitted by students.</p>
        </div>
      </div>

      <div className="bg-white border border-[#e5e0d8] rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf9f6] border-b border-[#e5e0d8] text-xs uppercase tracking-widest text-[#666]">
                <th className="p-4 font-bold">Student Info</th>
                <th className="p-4 font-bold">Academic Detail</th>
                <th className="p-4 font-bold">Message</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-[#999]">No leads found</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-[#e5e0d8] hover:bg-[#faf9f6] transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-bold text-[#1a1a1a]">{lead.name}</div>
                      <div className="text-sm text-[#666] mt-1">
                        <a href={`mailto:${lead.email}`} className="hover:text-[#c5a059] transition-colors">{lead.email}</a>
                      </div>
                      <div className="text-sm text-[#666]">
                        <a href={`tel:${lead.phone}`} className="hover:text-[#c5a059] transition-colors">{lead.phone}</a>
                      </div>
                      <div className="text-xs text-[#999] mt-2">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-sm">
                        <span className="font-bold text-[#1a1a1a]">Class:</span> {lead.currentClass}
                      </div>
                      <div className="text-sm mt-1">
                        <span className="font-bold text-[#1a1a1a]">Domain:</span> {lead.domain}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-sm text-[#444] max-w-xs italic border-l-2 border-[#c5a059] pl-3">
                        {lead.message || 'No specific message provided.'}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center justify-center gap-3">
                        <a 
                          href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '').slice(-10)}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#25D366] hover:text-[#128C7E] transition-colors"
                          title="Message on WhatsApp"
                        >
                          <FaWhatsapp size={20} />
                        </a>
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="text-[#1a1a1a] hover:text-[#c5a059] transition-colors"
                          title="Send Email"
                        >
                          <FaEnvelope size={18} />
                        </a>
                        <button 
                          onClick={() => handleDelete(lead._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete Request"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
