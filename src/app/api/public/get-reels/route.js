import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Reel from '@/models/Reel';

export async function GET() {
  try {
    await connectToDatabase();
    const reels = await Reel.find({ isActive: true }).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(reels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch reels', error: error.message }, { status: 500 });
  }
}
