import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
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
      return NextResponse.json({ message: 'Mentor ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const deletedMentor = await Mentor.findByIdAndDelete(id);
    if (!deletedMentor) {
      return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Mentor deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete mentor', error: error.message }, { status: 500 });
  }
}
