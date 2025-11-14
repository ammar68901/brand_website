import {compare} from 'bcrypt';
import {serialize} from 'cookie';
import db from '@/lib/db';
import {NextResponse, NextRequest} from 'next/server';
import {z} from "zod"
type AdminCred = {
    id : number
    email :string;
    password_hash: string 
}

export async function POST(request:NextRequest) {
    try{
        let {email, password}: AdminCred | any= await request.json()
        console.log(email, password)
        email = z.email({pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i}).parse(email)
        password = z.string().min(6).parse(password)

        if (email.length === 0 && password.length === 0){
            return NextResponse.json({'message': "Please Enter a Valid email"}, {status:400})
        }

        const result = await db.query('SELECT * FROM admin WHERE email = $1',[email])

        if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const admin:AdminCred = result.rows[0];

    // 2. Password match karta hai?
    const isValid = await compare(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
     // 3. Secure httpOnly cookie set karein (admin session)
    const sessionToken = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64');
    console.log('session token view', sessionToken)
    const cookie = serialize('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 din
      path: '/',
      sameSite: 'strict',
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}