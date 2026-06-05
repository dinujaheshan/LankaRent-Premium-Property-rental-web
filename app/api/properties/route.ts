import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category    = searchParams.get('category');
    const available   = searchParams.get('available');
    const search      = searchParams.get('search');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (category && category !== 'All') query.category = category;
    if (available === 'true') query.isAvailable = true;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { district: { $regex: search, $options: 'i' } },
    ];

    const properties = await Property.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch properties' }, { status: 500 });
  }
}
