import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

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
      return NextResponse.json({ message: 'FAQ ID is required' }, { status: 400 });
    }

    const data = await req.json();
    
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!updatedFAQ) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(updatedFAQ, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update FAQ', error: error.message }, { status: 500 });
  }
}
