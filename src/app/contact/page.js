'use client'

export default function ContactPage() {
  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#2c2c2c] pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20 border-b border-[#e5e0d8]">
        <img src="/hero_contact.png" alt="Contact Us" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-bold text-sm mb-4">Enquire Now</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Request <span className="text-[#c5a059] italic">Mentorship</span>
          </h1>
          <p className="text-gray-200 font-light max-w-lg mx-auto text-lg">
            Contact us today to schedule an exclusive consultation with our academic directors.
          </p>
        </div>
      </section>
      
      <div className="max-w-2xl mx-auto bg-white p-12 shadow-2xl border border-[#e5e0d8] relative z-20 -mt-32">
        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            try {
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              if(res.ok) {
                // Open WhatsApp link
                const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'; // Replace with actual number
                
                const message = `🎓 *FutureMap - New Guidance Request* 🎓

*Student Details:*
👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
📧 *Email:* ${data.email}

*Academic Info:*
🏫 *Current Class:* ${data.currentClass}
🎯 *Target Domain:* ${data.domain}

*Message / Requirements:*
_${data.message || 'No specific message provided.'}_

-----------------------------
_This lead was submitted via the FutureMap Contact Form_`;

                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
                window.open(waUrl, '_blank');

                alert('Thank you! We have received your request.');
                e.target.reset();
              } else {
                alert('Something went wrong. Please try again.');
              }
            } catch(err) {
              console.error(err);
            }
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="name" type="text" placeholder="Full Name" required className="bg-transparent border-b border-[#ccc] focus:border-[#c5a059] px-0 py-3 text-[#1a1a1a] focus:outline-none w-full transition-colors placeholder:text-[#999]" />
            <input name="phone" type="tel" placeholder="Phone Number" required className="bg-transparent border-b border-[#ccc] focus:border-[#c5a059] px-0 py-3 text-[#1a1a1a] focus:outline-none w-full transition-colors placeholder:text-[#999]" />
          </div>
          <input name="email" type="email" placeholder="Email Address" required className="bg-transparent border-b border-[#ccc] focus:border-[#c5a059] px-0 py-3 text-[#1a1a1a] focus:outline-none w-full transition-colors placeholder:text-[#999]" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select name="currentClass" required className="bg-transparent border-b border-[#ccc] focus:border-[#c5a059] px-0 py-3 text-[#1a1a1a] focus:outline-none w-full transition-colors">
              <option value="">Select Class</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
              <option value="Dropper">Dropper</option>
            </select>
            <select name="domain" required className="bg-transparent border-b border-[#ccc] focus:border-[#c5a059] px-0 py-3 text-[#1a1a1a] focus:outline-none w-full transition-colors">
              <option value="">Interested Domain</option>
              <option value="Engineering Pathways">Engineering Pathways</option>
              <option value="Medical Sciences">Medical Sciences</option>
              <option value="Administrative Careers">Administrative Careers</option>
              <option value="Creative Arts & Design">Creative Arts & Design</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <textarea name="message" placeholder="Message or specific requirements" rows="3" className="bg-transparent border-b border-[#ccc] focus:border-[#c5a059] px-0 py-3 text-[#1a1a1a] focus:outline-none w-full transition-colors resize-none placeholder:text-[#999]"></textarea>
          
          <div className="pt-6">
            <button type="submit" className="w-full py-4 bg-[#1a1a1a] hover:bg-[#c5a059] text-white uppercase text-sm tracking-widest font-bold transition-colors">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
