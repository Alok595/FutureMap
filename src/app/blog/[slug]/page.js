import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug, isPublished: true });
  
  if (!blog) {
    return { title: 'Not Found | FutureMap' };
  }

  return {
    title: `${blog.title} | FutureMap`,
    description: blog.excerpt || `Read ${blog.title} on FutureMap.`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on FutureMap.`,
      images: [blog.coverImage || '/hero_business.png'],
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  
  await connectToDatabase();
  const blog = await Blog.findOne({ slug, isPublished: true });
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-[#c5a059] hover:text-[#1a1a1a] transition-colors mb-10 inline-block">
          ← Back to Journal
        </Link>
        
        {blog.category && (
          <div className="mb-6">
            <span className="bg-[#1a1a1a] text-[#c5a059] px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
              {blog.category}
            </span>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#999] mb-12 pb-8 border-b border-[#e5e0d8]">
          <span className="text-[#1a1a1a]">{blog.author || 'FutureMap Editorial'}</span>
          <span className="hidden sm:inline">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        {blog.coverImage && (
          <div className="w-full h-[400px] md:h-[600px] mb-16 overflow-hidden">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        )}
        
        {/* We use a prose class to auto-format the HTML string from the WYSIWYG editor */}
        <article 
          className="prose prose-lg prose-[#1a1a1a] max-w-none font-sans prose-headings:font-serif prose-headings:text-[#1a1a1a] prose-a:text-[#c5a059] prose-img:w-full prose-img:my-8" 
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
    </div>
  );
}
