import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await dbConnect();
    const { isRead } = await request.json();
    const inquiry = await Inquiry.findByIdAndUpdate(params.id, { isRead }, { new: true });
    if (!inquiry) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: inquiry });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
