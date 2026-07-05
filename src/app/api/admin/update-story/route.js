import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function PUT(req) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: 'Story ID is required' }, { status: 400 });
    }

    const data = await req.json();
    
    const updatedStory = await SuccessStory.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!updatedStory) {
      return NextResponse.json({ message: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update story', error: error.message }, { status: 500 });
  }
}
