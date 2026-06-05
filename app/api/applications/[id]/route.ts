import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Auth check
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { status, notes } = body;

    const validStatuses = ['Under Review', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const application = await Application.findByIdAndUpdate(
      params.id,
      { status, ...(notes !== undefined ? { notes } : {}) },
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: application });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update application' }, { status: 500 });
  }
}
