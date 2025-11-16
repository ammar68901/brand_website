export const runtime = 'nodejs';

import db from "@/lib/db";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  // console.log("User:", user);
  
  const token = request.cookies.get('token')?.value;
  console.log(token)
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  let userId: number;
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: number };
    userId = decoded.userId;
    
  } catch (error) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (!userId) {
    return NextResponse.json({ message: "Please Login" }, { status: 400 });
  }
  console.log('userid', userId)

  try {
    const data = await db.query("SELECT * FROM orders WHERE user_id = $1", [
      userId,
    ]);
    console.log(data.rows);
    if (data.rows.length === 0) {
      return NextResponse.json({ message: "No Orders Found", data: data.rows },
      { status: 200 });
    }

    return NextResponse.json(
      { message: "success", data: data.rows },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
}
