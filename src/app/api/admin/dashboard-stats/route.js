import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Lead from '@/models/Lead';
import Blog from '@/models/Blog';
import Mentor from '@/models/Mentor';
import Reel from '@/models/Reel';
import SuccessStory from '@/models/SuccessStory';
import FAQ from '@/models/FAQ';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // 1. Fetch Totals
    const [
      totalUsers,
      totalLeads,
      totalBlogs,
      totalMentors,
      totalReels,
      totalSuccessStories,
      totalFaqs
    ] = await Promise.all([
      User.countDocuments(),
      Lead.countDocuments(),
      Blog.countDocuments(),
      Mentor.countDocuments(),
      Reel.countDocuments(),
      SuccessStory.countDocuments(),
      FAQ.countDocuments()
    ]);

    // 2. Fetch Recent Users (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt image provider');

    // 3. Generate Chart Data (Last 14 days)
    const chartData = [];
    const today = new Date();
    
    // Create map for the last 14 days
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      chartData.push({
        date: dateStr,
        displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: 0,
        leads: 0,
      });
    }

    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch users created in last 14 days
    const recentUsersData = await User.find({
      createdAt: { $gte: fourteenDaysAgo }
    }).select('createdAt');

    // Fetch leads created in last 14 days
    const recentLeadsData = await Lead.find({
      createdAt: { $gte: fourteenDaysAgo }
    }).select('createdAt');

    // Populate chartData
    recentUsersData.forEach(user => {
      if (!user.createdAt) return;
      const dateStr = new Date(user.createdAt).toISOString().split('T')[0];
      const dataPoint = chartData.find(d => d.date === dateStr);
      if (dataPoint) dataPoint.users += 1;
    });

    recentLeadsData.forEach(lead => {
      if (!lead.createdAt) return;
      const dateStr = new Date(lead.createdAt).toISOString().split('T')[0];
      const dataPoint = chartData.find(d => d.date === dateStr);
      if (dataPoint) dataPoint.leads += 1;
    });

    return NextResponse.json({
      counts: {
        totalUsers,
        totalLeads,
        totalBlogs,
        totalMentors,
        totalReels,
        totalSuccessStories,
        totalFaqs
      },
      recentUsers,
      chartData
    }, { status: 200 });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return NextResponse.json({ message: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
