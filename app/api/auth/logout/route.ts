import { AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  // Clear the auth cookie
  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        'Set-Cookie': `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;`,
        'Content-Type': 'application/json',
      },
    }
  );
}
