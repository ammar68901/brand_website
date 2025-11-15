import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import db from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  // 1. Admin session cookie check karein
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get('admin_session')?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Session validate karein (DB check ke saath)
  try {
    const [adminId] = Buffer.from(sessionToken, 'base64').toString().split(':');
    const result = await db.query('SELECT id FROM admin WHERE id = $1', [adminId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 3. Agar admin valid hai → Clerk se user count fetch karein
  try {
    const res = await fetch('https://api.clerk.com/v1/users/count', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Clerk API responded with status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ total_users: data.total_count });
  } catch (error: any) {
    console.error('Clerk user count error:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to fetch user count' },
      { status: 500 }
    );
  }
}