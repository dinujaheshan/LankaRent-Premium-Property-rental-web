import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth';
import { sendInquiryReplyEmail } from '@/lib/mail';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authorization
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { replyMessage } = await request.json();

    if (!replyMessage || replyMessage.trim() === '') {
      return NextResponse.json({ success: false, error: 'Reply message cannot be empty' }, { status: 400 });
    }

    const inquiry = await Inquiry.findById(params.id);
    if (!inquiry) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    // Update the inquiry
    inquiry.replyMessage = replyMessage;
    inquiry.repliedAt = new Date();
    inquiry.isReplied = true;
    inquiry.isRead = true; // Auto mark as read when replying
    await inquiry.save();

    // Send inquiry reply email
    try {
      await sendInquiryReplyEmail(inquiry.email, inquiry.fullName, inquiry.message, replyMessage);
    } catch (mailError) {
      console.error('Failed to send inquiry reply email:', mailError);
    }

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error('Inquiry reply error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send reply' }, { status: 500 });
  }
}
