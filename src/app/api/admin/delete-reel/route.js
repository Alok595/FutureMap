import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Reel from '@/models/Reel';
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
      return NextResponse.json({ message: 'Reel ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const deletedReel = await Reel.findByIdAndDelete(id);
    if (!deletedReel) {
      return NextResponse.json({ message: 'Reel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reel deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete reel', error: error.message }, { status: 500 });
  }
}
