import { NextRequest } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic'; // Always run on server

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const category = searchParams.get('category'); // 'male', 'female', or null
    const brand = searchParams.get('brand');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    console.log('Page:', page);
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20')); // Max 100 per page
    console.log('limit:', limit);
    const offset = (page - 1) * limit;
    console.log('Offset:', offset);

    // Build query
    let query = 'SELECT id, name, brand, price,stock, category, image_url FROM perfumes WHERE 1=1';
    const values: any[] = [];
    let paramIndex = 1;

    if (category) { 
    query += ` AND category = $${paramIndex++}`;
      values.push(category);
    }
    if (brand) {
      query += ` AND brand ILIKE $${paramIndex++}`;
      values.push(`%${brand}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    values.push(limit, offset);
    const result = await db.query(query, values);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30', // Good for listing
      },
    });
  } catch (error) {
    console.error('Fetch perfumes error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch perfumes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}