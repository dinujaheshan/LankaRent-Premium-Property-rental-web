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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate category if provided
    if (body.category) {
      const validCategories = ['Apartment', 'Studio', 'Office', 'Villa'];
      if (!validCategories.includes(body.category)) {
        return NextResponse.json(
          { success: false, error: 'Invalid category.' },
          { status: 400 }
        );
      }
    }

    // Convert numeric fields
    if (body.monthlyRate !== undefined) body.monthlyRate = Number(body.monthlyRate);
    if (body.bedrooms !== undefined) body.bedrooms = Number(body.bedrooms);
    if (body.bathrooms !== undefined) body.bathrooms = Number(body.bathrooms);
    if (body.areaSqft !== undefined) body.areaSqft = Number(body.areaSqft);
    if (body.availableFrom) body.availableFrom = new Date(body.availableFrom);

    const property = await Property.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error('Update property error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const property = await Property.findByIdAndDelete(params.id);

    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete property' }, { status: 500 });
  }
}
