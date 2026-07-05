import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Story ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const deletedStory = await SuccessStory.findByIdAndDelete(id);
    if (!deletedStory) {
      return NextResponse.json({ message: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Story deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete story', error: error.message }, { status: 500 });
  }
}
