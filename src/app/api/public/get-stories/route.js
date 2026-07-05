import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

export async function GET() {
  try {
    await connectToDatabase();
    const stories = await SuccessStory.find({ isPublished: true }).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch stories', error: error.message }, { status: 500 });
  }
}
