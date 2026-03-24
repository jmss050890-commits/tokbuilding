import crypto from 'crypto';

export const AUTH_COOKIE_NAME = 'auth_token';
const AUTH_DURATION_SECONDS = 60 * 60 * 24 * 7;

export type AuthSession = {
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
};

function getAuthSecret() {
  const authSecret = process.env.AUTH_SECRET || process.env.ADMIN_TOKEN;

  if (authSecret) {
    return authSecret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET is required in production');
  }

  return 'development-auth-secret';
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signValue(value: string) {
  return crypto.createHmac('sha256', getAuthSecret()).update(value).digest('base64url');
}

export function createAuthToken(session: Omit<AuthSession, 'expiresAt'>) {
  const payload: AuthSession = {
    ...session,
    expiresAt: Date.now() + AUTH_DURATION_SECONDS * 1000,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signValue(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAuthToken(token: string | null | undefined): AuthSession | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as Partial<AuthSession>;
    if (
      !payload.userId ||
      !payload.email ||
      !payload.name ||
      typeof payload.expiresAt !== 'number' ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    return payload as AuthSession;
  } catch {
    return null;
  }
}

export function getCookieValue(cookieHeader: string | null, cookieName: string) {
  if (!cookieHeader) {
    return null;
  }

  const cookie = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`));

  return cookie ? decodeURIComponent(cookie.slice(cookieName.length + 1)) : null;
}

export function getAuthenticatedSession(request: Request) {
  const authToken = getCookieValue(request.headers.get('cookie'), AUTH_COOKIE_NAME);
  return verifyAuthToken(authToken);
}

export function createAuthCookie(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
  return `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${AUTH_DURATION_SECONDS};${secure}`;
}
