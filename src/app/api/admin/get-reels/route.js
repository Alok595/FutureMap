import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Reel from '@/models/Reel';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const reels = await Reel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch reels', error: error.message }, { status: 500 });
  }
}
