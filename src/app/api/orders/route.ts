import db from '@/lib/db';
import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema for delivery info
const deliverySchema = z.object({
  customer_name: z.string().min(2).max(100),
  address: z.string().min(5).max(500),
  city: z.string().min(2).max(50),
  postalCode: z.string().max(10).optional(), // note: camelCase
  number: z.string().regex(/^03\d{9}$/, "Invalid Pakistani phone number"),
});

// Main handler
export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json();

    // Step 1: Delivery info validate karein
    const delivery = deliverySchema.parse(body.formData);
    const { customer_name, address, city, postalCode, number: phone } = delivery;

    // Step 2: Cart items extract karein (keys '0', '1', '2'...)
    const items: { id: number; name: string; price: string; quantity: number }[] = [];
    
    for (const key in body) {
      if (key !== 'formData' && typeof body[key] === 'object') {
        const item = body[key];
        items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
    }

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items in cart' }), { status: 400 });
    }

    // ✅ Step 3: Perfume details DB se verify karein (anti-tampering)
    let totalAmount = 0;
    const orderRecords = [];

    for (const item of items) {
      const dbPerfume = await db.query(
        'SELECT id, price FROM perfumes WHERE id = $1',
        [item.id]
      );

      if (dbPerfume.rows.length === 0) {
        return new Response(JSON.stringify({ error: `Perfume ${item.id} not found` }), { status: 400 });
      }

      const dbPrice = parseFloat(dbPerfume.rows[0].price);
      const clientPrice = parseFloat(item.price);
      const expectedTotal = dbPrice * item.quantity;
      totalAmount += expectedTotal;

      // Optional: price mismatch check
      if (Math.abs(clientPrice - dbPrice) > 0.01) {
        return new Response(JSON.stringify({ error: `Price mismatch for ${item.name}` }), { status: 400 });
      }

      orderRecords.push({
        perfume_id: item.id,
        quantity: item.quantity,
        total_price: expectedTotal
      });
    }

    // ✅ Step 4: Har item ke liye alag order record insert karein (ya bulk insert)
    for (const rec of orderRecords) {
      await db.query(
        `INSERT INTO orders (
          user_id, perfume_id, quantity, total_price,
          customer_name, phone, address, city, postal_code
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          userId,
          rec.perfume_id,
          rec.quantity,
          rec.total_price,
          customer_name,
          phone,
          address,
          city,
          postalCode || null
        ]
      );
    } 
    let updateStock: { id: number; stock: number }[] = [];

    for (const item of items) {
      const res = await db.query(
        `UPDATE perfumes
         SET stock = stock - $1
         WHERE id = $2 AND stock >= $1
         RETURNING id, stock`,
        [Number(item.quantity), item.id]
      );

      // If no rows returned, either perfume not found or insufficient stock
      if (res.rows.length === 0) {
        return NextResponse.json(
          JSON.stringify({ error: `Insufficient stock for perfume ${item.id}` }),
          { status: 400 }
        );
      }

      updateStock.push(res.rows[0]);
    }
    
   

    return new Response(JSON.stringify({ success: true, total: totalAmount,stock: updateStock  }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Validation failed', details: error }), { status: 400 });
    }
    console.error('Order error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}