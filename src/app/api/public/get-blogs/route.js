import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 0; // 0 means no limit
    
    // Only fetch published blogs
    let query = Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const blogs = await query;
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch blogs', error: error.message }, { status: 500 });
  }
}
