import { jwtVerify } from 'jose';

// 1. Get your secret key from environment variables
// vital: Ensure this matches the key used to SIGN the token in your login API
const SECRET_KEY = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);

export async function verifyToken(token: string) {
  try {
    // 2. Verify the token
    const { payload } = await jwtVerify(token, SECRET_KEY);
    
    // 3. Return the payload (e.g., admin ID, role) if valid
    return payload; 
  } catch (error) {
    // 4. If token is expired or invalid, throw error
    console.log(error)
    return null;
  }
}