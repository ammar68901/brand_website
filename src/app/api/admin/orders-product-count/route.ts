import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("admin_session")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Session validate karein (DB check ke saath)
  try {
    const verfiyTokenAdminPayload = await verifyToken(sessionToken);
    const result = await db.query("SELECT id FROM admin WHERE email = $1", [
      verfiyTokenAdminPayload?.email,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result_order = await db.query("SELECT COUNT(*) FROM orders");
    const result_product = await db.query("SELECT COUNT(*) FROM perfumes");
    return NextResponse.json(
      {
        total_orders: parseInt(result_order.rows[0].count, 10),
        total_products: parseInt(result_product.rows[0].count, 10),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  }
};
