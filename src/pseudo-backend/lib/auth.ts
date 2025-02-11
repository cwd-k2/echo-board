import { jwtVerify, SignJWT } from 'jose';

// 面倒なので適当
const SECRET_KEY = new TextEncoder().encode('deadbeef-dead-dead-deadbeef');

export async function sha256(s: string): Promise<string> {
  return crypto.subtle
    .digest('SHA-256', new TextEncoder().encode(s))
    .then((a) => new TextDecoder().decode(a));
}

export async function generateToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(SECRET_KEY);
}

export async function verifyUser(token?: string | null): Promise<string> {
  if (token === null || token === undefined) throw new Error('Invalid token');

  const { payload } = await jwtVerify(token, SECRET_KEY);
  return payload.userId as string;
}
