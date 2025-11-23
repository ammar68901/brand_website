import {compare} from 'bcrypt';
import {serialize} from 'cookie';
import {SignJWT} from 'jose'
import db from '@/lib/db';
import {NextResponse, NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';
import {z} from "zod"
import { cookies } from 'next/headers';
type AdminCred = {
    id : number
    email :string;
    password_hash: string 
}

export async function POST(request:NextRequest) {
    try{
        let {email, password}: AdminCred | any= await request.json()
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

    const SECRET_KEY_JWT = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);


    // const jwt_token = jwt.sign(
    //   { adminId: admin.id, email: admin.email },
    //   JWT_SECRET!,
    //   { expiresIn: '1d' }
    // );

    const token = await new SignJWT({ adminId: admin.id, email: admin.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // Token expires in 2 hours
    .sign(SECRET_KEY_JWT);
    (await cookies()).set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
// const sessionToken = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64');
// const cookie = serialize('admin_session', jwt_token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   maxAge: 60 * 60 * 24, // 1 din
//   path: '/',
//   sameSite: 'strict',
// });