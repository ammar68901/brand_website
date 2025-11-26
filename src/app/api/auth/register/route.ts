import { NextRequest } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/db";
import  {v4 as uuidv4} from 'uuid'
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  try {
    const { email, password, phoneNumber , username} = await request.json();
    if (!email || !password || !phoneNumber || !username) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        { status: 400 }
      );
    }
    if (email.length === 0 || phoneNumber.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Please provide valid email and phone number",
        }),
        { status: 400 }
      );
    }
    if (username.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid username" }),
        { status: 400 }
      );
    }
    // Optional validation
    if (!/^\d{11}$/.test(phoneNumber) || !phoneNumber.startsWith("03")) {
      return new Response(
        JSON.stringify({ error: "Invalid Pakistani phone number" }),
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await db.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);
    const phonenumber = phoneNumber

    const id = uuidv4()
    await db.query(
      "INSERT INTO users (id ,email, password_hash, phonenumber, username) VALUES ($1, $2, $3, $4, $5)",
      [id,email, passwordHash, phonenumber, username]
    );

    // Create JWT token
    const token = jwt.sign({ userId:id, email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });


    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Register error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
