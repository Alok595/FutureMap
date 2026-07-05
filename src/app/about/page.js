import connectToDatabase from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import FAQModel from '@/models/FAQ';

export const metadata = { title: "About Us - FutureMap" };

import FAQ from '@/components/ui/FAQ';
import StoryTimeline from '@/components/ui/StoryTimeline';

export default async function AboutPage() {
  await connectToDatabase();
  const rawMentors = await Mentor.find({}).sort({ createdAt: -1 });
  const rawFaqs = await FAQModel.find({ isActive: true }).sort({ createdAt: -1 });
  
  const team = rawMentors.map(m => {
    const obj = m.toObject();
    obj._id = obj._id.toString();
    return obj;
  });

  const faqs = rawFaqs.map(f => {
    const obj = f.toObject();
    obj._id = obj._id.toString();
    return obj;
  });

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#2c2c2c] pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <img src="/hero_about.png" alt="About FutureMap" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-bold text-sm mb-4">Our Philosophy</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white">
            Eliminating <span className="text-[#c5a059] italic">Confusion</span>
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-4xl mx-auto text-center px-8 mb-32">
        <p className="text-xl font-light leading-relaxed text-[#444] mb-8">
          At FutureMap, we believe the biggest tragedy in modern education is not a lack of intelligence, but a lack of direction. We exist to ensure that no student wanders aimlessly through their academic life.
        </p>
        <p className="text-lg font-light leading-relaxed text-[#666]">
          We do not simply teach students how to pass exams. We sit with them, analyze their unique interests, and illuminate the vast landscape of career options available to them. Once a passion is identified, we build the exact roadmap—detailing every subject, skill, and exam required to turn that passion into a reality.
        </p>
      </section>

      {/* Story Timeline Section */}
      <StoryTimeline />

      {/* Core Values Section */}
      <section className="bg-[#1a1a1a] text-white py-24 mb-32 border-y border-[#333]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Core <span className="text-[#c5a059] italic">Tenets</span></h2>
            <div className="w-16 h-[2px] bg-[#c5a059] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-2xl font-serif text-[#c5a059] mb-4">Absolute Clarity</h3>
              <p className="text-[#ccc] font-light leading-relaxed text-sm">We replace anxiety and guesswork with definitive, data-backed career roadmaps.</p>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-[#c5a059] mb-4">Unbiased Guidance</h3>
              <p className="text-[#ccc] font-light leading-relaxed text-sm">Our advice is strictly based on the student's psychological profile, not on societal pressure.</p>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-[#c5a059] mb-4">Elite Execution</h3>
              <p className="text-[#ccc] font-light leading-relaxed text-sm">Once a path is chosen, we demand excellence and focus in achieving the required academic milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 mb-32">
        <div className="text-center mb-16">
          <p className="text-[#c5a059] uppercase tracking-[0.2em] font-bold text-sm mb-4">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">Parent <span className="text-[#c5a059] italic">FAQ</span></h2>
          <div className="w-16 h-[2px] bg-[#c5a059] mx-auto"></div>
        </div>

        <FAQ initialFaqs={faqs} />
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-8 mb-20">
        <div className="text-center mb-16">
          <p className="text-[#c5a059] uppercase tracking-[0.2em] font-bold text-sm mb-4">The Experts</p>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-6">Meet Our <span className="text-[#c5a059] italic">Mentors</span></h2>
          <p className="text-[#666] max-w-2xl mx-auto font-light">
            Our guidance is delivered by industry veterans, former bureaucrats, and elite academicians who have walked the paths they now map for others.
          </p>
        </div>

        {team.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No mentors available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member) => (
              <div key={member._id} className="group cursor-pointer">
                <div className="relative w-full h-[500px] overflow-hidden mb-6 border border-[#e5e0d8] shadow-lg group-hover:shadow-xl transition-shadow bg-gray-100">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-1 text-center">{member.name}</h3>
                <p className="text-[#c5a059] text-sm uppercase tracking-widest text-center font-bold">{member.expertise}</p>
                {member.bio && (
                   <p className="text-[#666] font-light text-center mt-3 text-sm line-clamp-3">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="text-center mt-24">
        <a href="/contact" className="px-10 py-4 bg-[#1a1a1a] text-white uppercase text-sm tracking-widest font-bold hover:bg-[#c5a059] transition-colors shadow-xl">
          Request a Consultation
        </a>
      </div>
    </div>
  );
}
