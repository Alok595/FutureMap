import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

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
    const faqs = await FAQ.find({}).sort({ createdAt: -1 });
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch FAQs', error: error.message }, { status: 500 });
  }
}
