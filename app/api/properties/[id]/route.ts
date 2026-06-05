import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const property = await Property.findById(params.id).lean();
    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch property' }, { status: 500 });
  }
}
