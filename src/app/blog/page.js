import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';

export const metadata = { title: "Editorial Blog - FutureMap" };

export default async function BlogPage() {
  await connectToDatabase();
  const rawBlogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
  // Convert Mongoose documents to plain JS objects so they can be passed to Client Components if needed
  const articles = rawBlogs.map(b => {
    const obj = b.toObject();
    obj._id = obj._id.toString();
    return obj;
  });

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white pb-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20 border-b border-[#333]">
        <img src="/hero_business.png" alt="FutureMap Editorial" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-bold text-sm mb-4">Editorial Insights</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            The <span className="text-[#c5a059] italic">Journal</span>
          </h1>
          <p className="text-gray-300 font-light max-w-lg mx-auto text-lg">
            High-end perspectives on modern career dynamics, educational psychology, and industry trends.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8">
        {articles.length === 0 ? (
           <div className="text-center text-gray-500 py-20">No articles available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article, idx) => (
              <Link href={`/blog/${article.slug || '#'}`} key={idx} className="group cursor-pointer block">
                
                <div className="relative w-full h-[400px] overflow-hidden mb-8 border border-[#333] shadow-lg group-hover:border-[#c5a059] transition-colors bg-[#2c2c2c]">
                  {article.coverImage ? (
                    <img src={article.coverImage} alt={article.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                  )}
                  {article.category && (
                    <div className="absolute top-4 left-4 bg-[#1a1a1a] text-[#c5a059] px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                      {article.category}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-[#999] text-xs uppercase tracking-widest font-bold mb-4">
                  <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                <h2 className="text-2xl font-serif text-white leading-snug mb-4 group-hover:text-[#c5a059] transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-[#ccc] font-light leading-relaxed text-sm line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="mt-8 flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">Read Article</span>
                  <div className="w-8 h-[1px] bg-[#c5a059] group-hover:w-16 transition-all duration-500"></div>
                </div>
                
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
