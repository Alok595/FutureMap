import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();
    
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
       return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Prevent modifying the master admin defined in environment variables
    if (userToUpdate.email === process.env.ADMIN_EMAIL) {
       return NextResponse.json({ error: 'Cannot modify role of the master admin' }, { status: 403 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    return NextResponse.json({ user: updatedUser, message: 'User role updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
