import connectToDatabase from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

export const metadata = { title: "Success Stories - FutureMap" };

export default async function SuccessStoriesPage() {
  await connectToDatabase();
  const rawStories = await SuccessStory.find({ isPublished: true }).sort({ createdAt: -1 });
  // Convert Mongoose documents to plain JS objects
  const stories = rawStories.map(s => {
    const obj = s.toObject();
    obj._id = obj._id.toString();
    return obj;
  });

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#2c2c2c] pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20 border-b border-[#e5e0d8]">
        <img src="/hero_story.png" alt="Success Stories" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-bold text-sm mb-4">Case Studies</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Clarity in <span className="text-[#c5a059] italic">Action</span>
          </h1>
          <p className="text-gray-200 font-light max-w-lg mx-auto text-lg">
            Real students who found their true calling through our elite discovery process.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8">
        {stories.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No success stories available yet.</div>
        ) : (
          <div className="space-y-24">
            {stories.map((story, idx) => (
              <div key={story._id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  {story.videoReel ? (
                    <div className="relative w-full aspect-video border border-[#e5e0d8] shadow-2xl p-4 bg-white">
                      <div className="absolute inset-4 overflow-hidden bg-black">
                        <video src={story.videoReel} controls className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ) : story.image ? (
                    <div className="relative w-full h-[600px] border border-[#e5e0d8] shadow-2xl p-4 bg-white">
                      <div className="absolute inset-4 overflow-hidden">
                        <img src={story.image} alt={story.studentName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-[400px] border border-[#e5e0d8] shadow-2xl p-4 bg-white flex items-center justify-center">
                      <span className="text-gray-400">No media available</span>
                    </div>
                  )}
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8">
                  <h2 className="text-4xl font-serif text-[#1a1a1a] mb-8">{story.studentName}</h2>
                  
                  <div className="space-y-6 mb-10">
                    {story.originalGoal && (
                      <div className="border-l-2 border-[#c5a059] pl-6 py-1">
                        <p className="text-xs uppercase tracking-widest text-[#999] font-bold mb-1">Original Goal</p>
                        <p className="text-lg text-[#1a1a1a] font-serif">{story.originalGoal}</p>
                      </div>
                    )}
                    {story.course && (
                      <div className="border-l-2 border-[#c5a059] pl-6 py-1">
                        <p className="text-xs uppercase tracking-widest text-[#999] font-bold mb-1">Discovered Path</p>
                        <p className="text-xl text-[#c5a059] font-serif font-bold">{story.course}</p>
                      </div>
                    )}
                    {story.university && (
                      <div className="border-l-2 border-[#c5a059] pl-6 py-1">
                        <p className="text-xs uppercase tracking-widest text-[#999] font-bold mb-1">Target Achieved</p>
                        <p className="text-lg text-[#1a1a1a] font-serif">{story.university}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#1a1a1a] p-8 relative">
                    <span className="text-[#c5a059] text-6xl font-serif absolute top-4 left-4 opacity-20">"</span>
                    <p className="text-[#ccc] font-light italic leading-relaxed relative z-10">
                      {story.testimonial}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
