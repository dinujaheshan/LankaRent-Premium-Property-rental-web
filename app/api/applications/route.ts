import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import Property from '@/lib/models/Property';
import { sendApplicationConfirmationEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      propertyId,
      propertyTitle,
      fullName,
      email,
      phone,
      employmentStatus,
      grossAnnualIncome,
      proposedMoveIn,
    } = body;

    // Validation
    if (!fullName || !email || !propertyId || !proposedMoveIn || !grossAnnualIncome) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const moveInDate = new Date(proposedMoveIn);
    if (moveInDate <= new Date()) {
      return NextResponse.json({ success: false, error: 'Move-in date must be a future date' }, { status: 400 });
    }

    if (grossAnnualIncome < 600000) {
      return NextResponse.json({ success: false, error: 'Gross annual income must be at least LKR 600,000' }, { status: 400 });
    }

    const application = await Application.create({
      propertyId,
      propertyTitle,
      fullName,
      email,
      phone: phone || '',
      employmentStatus,
      grossAnnualIncome,
      proposedMoveIn: moveInDate,
      status: 'Under Review',
    });

    // Send confirmation email
    try {
      const property = await Property.findById(propertyId);
      const monthlyRate = property ? property.monthlyRate : 0;
      await sendApplicationConfirmationEmail(email, fullName, propertyTitle, monthlyRate);
    } catch (mailError) {
      console.error('Failed to send application confirmation email:', mailError);
    }

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (email) {
      query.email = { $regex: `^${email.trim()}$`, $options: 'i' };
    }

    const applications = await Application.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: applications });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch applications' }, { status: 500 });
  }
}
