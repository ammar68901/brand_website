import { verify } from 'jsonwebtoken';
import db from '@/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return NextResponse.json({message:'Unauthorized Login'}, { status: 401 });

  try {
    const { userId } = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await db.query('SELECT email FROM users WHERE id = $1', [userId]);
    if (!user.rows[0]) return NextResponse.json({message:'User not found'}, { status: 404 });
    return Response.json({ email: user.rows[0].email });
  } catch (error) {
    return NextResponse.json({message:'Invalid token login again'}, { status: 401 });
  }
} 