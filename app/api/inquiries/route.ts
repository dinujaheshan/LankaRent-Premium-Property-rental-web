import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { fullName, email, phone, inquiryType, message } = body;

    if (!fullName || !email || !inquiryType || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ fullName, email, phone: phone || '', inquiryType, message });
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: inquiries });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
