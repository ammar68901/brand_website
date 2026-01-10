import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { verifyToken } from '@/lib/auth';

// Cloudinary config (Same as before)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Admin validation (Same as before)
async function validateAdmin() {
  const cookieStore = await cookies(); // Note: cookies() is also a promise in Next.js 15
  const sessionToken = cookieStore.get('admin_session')?.value;
  if (!sessionToken) return false;

  try {
    const validateAdminPayload = await verifyToken(sessionToken);
    const adminEmail = validateAdminPayload?.email;
    if (!adminEmail) return false;
    const result = await db.query('SELECT id FROM admin WHERE email = $1', [adminEmail]);
    return result.rows.length > 0;
  } catch {
    return false;
  }
}

export const runtime = 'nodejs';

export async function PUT(
  request: NextRequest,
  // 🛠️ FIX 1: Type 'params' as a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  // 🔐 1. Admin check
  const isAdmin = await validateAdmin();
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // 🛠️ FIX 2: Await the params object to get the ID
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    // 📥 2. Form data + file extract karein
    const formData = await request.formData();
    
    // Basic fields
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const description = formData.get('description') as string;

    // Validate required fields
    if (!name || !brand || !category || isNaN(price) || isNaN(stock)) {
      return new Response(JSON.stringify({ error: 'Missing or invalid fields' }), { status: 400 });
    }

    // 📤 3. Cloudinary Upload
    let imageUrl = formData.get('imageUrl') as string; 
    const file = formData.get('image') as File | null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'perfumes' },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });
      imageUrl = (result as unknown as { secure_url: string }).secure_url;
    }

    // 💾 4. DB update
    await db.query(
      `UPDATE perfumes 
       SET name = $1, brand = $2, category = $3, price = $4, 
           stock = $5, description = $6, image_url = $7, updated_at = NOW()
       WHERE id = $8`,
      [name, brand, category, price, stock, description, imageUrl, id]
    );

    return new Response(JSON.stringify({ success: true, image_url: imageUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Update error:', error);
    return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500 });
  }
}