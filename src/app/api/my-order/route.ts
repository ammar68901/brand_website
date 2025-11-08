import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  console.log("User ID:", userId);
  if (!userId) {
    return NextResponse.json({ message: "Please Login" }, { status: 400 });
  }

  try {
    const data = await db.query("SELECT * FROM orders WHERE user_id = $1", [
      userId,
    ]);
    console.log(data.rows);
    if (data.rows.length === 0) {
      return new Response(JSON.stringify({ error: `User not found` }), {
        status: 400,
      });
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
