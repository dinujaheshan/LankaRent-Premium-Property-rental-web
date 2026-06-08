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

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    const required = ['title', 'category', 'location', 'district', 'monthlyRate', 'description', 'areaSqft', 'availableFrom'];
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate category
    const validCategories = ['Apartment', 'Studio', 'Office', 'Villa'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category. Must be Apartment, Studio, Office, or Villa.' },
        { status: 400 }
      );
    }

    const property = await Property.create({
      title: body.title,
      category: body.category,
      location: body.location,
      district: body.district,
      monthlyRate: Number(body.monthlyRate),
      description: body.description,
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 1,
      areaSqft: Number(body.areaSqft),
      amenities: body.amenities || [],
      petPolicy: body.petPolicy || 'No Pets Allowed',
      utilitiesIncluded: body.utilitiesIncluded || [],
      availableFrom: new Date(body.availableFrom),
      isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
      images: body.images || [],
    });

    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    console.error('Create property error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create property' }, { status: 500 });
  }
}
