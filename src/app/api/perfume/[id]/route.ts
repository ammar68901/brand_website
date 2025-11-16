import { NextRequest } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const perfume_id = parseInt((await params).id, 10);
    if (isNaN(perfume_id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    const result = await db.query(
      `SELECT id, name, brand, price, category, description,stock, image_url, created_at
       FROM perfumes WHERE id = $1`,
      [perfume_id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Perfume not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400', // Cache 1h on edge
      },
    });
  } catch (error) {
    console.error('Fetch perfume detail error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}