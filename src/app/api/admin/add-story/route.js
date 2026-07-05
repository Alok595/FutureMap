import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function POST(req) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const data = await req.json();
    
    const newStory = await SuccessStory.create(data);
    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create success story', error: error.message }, { status: 500 });
  }
}
