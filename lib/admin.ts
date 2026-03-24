import crypto from 'crypto';

export function isValidAdminToken(token: string | null | undefined) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || !token) {
    return false;
  }

  const actual = Buffer.from(token);
  const expected = Buffer.from(adminToken);

  if (actual.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(actual, expected);
}
