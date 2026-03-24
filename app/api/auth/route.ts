import { getUsersCollection } from '@/lib/db';
import * as crypto from 'crypto';
import { createAuthCookie, createAuthToken, getAuthenticatedSession } from '@/lib/auth';

/**
 * User Authentication API
 * POST /api/auth/signup - Create new user account
 * POST /api/auth/login - Login user
 * GET /api/auth/me - Get current user (requires auth)
 */

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(req: Request) {
  try {
    const { action, email, password, name } = await req.json();

    if (!action || !['signup', 'login'].includes(action)) {
      return Response.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const usersCollection = await getUsersCollection();

    if (action === 'signup') {
      if (!email || !password || !name) {
        return Response.json(
          { error: 'Missing email, password, or name' },
          { status: 400 }
        );
      }

      // Check if user already exists
      const existing = await usersCollection.findOne({ email });
      if (existing) {
        return Response.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }

      // Create new user
      type UserDocument = {
        email: string;
        passwordHash: string;
        name: string;
        signupDate: Date;
        preferences: {
          emailNotifications: boolean;
          receiveUpdates: boolean;
        };
      };

      const user: UserDocument = {
        email,
        passwordHash: hashPassword(password),
        name,
        signupDate: new Date(),
        preferences: {
          emailNotifications: true,
          receiveUpdates: true,
        },
      };

      const result = await usersCollection.insertOne(user);

      const token = createAuthToken({
        userId: result.insertedId.toString(),
        email,
        name,
      });

      return Response.json(
        {
          success: true,
          user: {
            _id: result.insertedId.toString(),
            email,
            name,
          },
          token,
        },
        {
          headers: {
            'Set-Cookie': createAuthCookie(token),
          },
        }
      );
    }

    if (action === 'login') {
      if (!email || !password) {
        return Response.json(
          { error: 'Missing email or password' },
          { status: 400 }
        );
      }

      // Find user
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return Response.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Verify password
      if (user.passwordHash !== hashPassword(password)) {
        return Response.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Update last login
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { lastLogin: new Date() } }
      );

      const token = createAuthToken({
        userId: user._id?.toString() || '',
        email: user.email,
        name: user.name,
      });

      return Response.json(
        {
          success: true,
          user: {
            _id: user._id?.toString(),
            email: user.email,
            name: user.name,
          },
          token,
        },
        {
          headers: {
            'Set-Cookie': createAuthCookie(token),
          },
        }
      );
    }
  } catch (error) {
    console.error('[Auth] Error:', error);
    return Response.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = getAuthenticatedSession(req);
    if (!session) {
      return Response.json(
        { authenticated: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email: session.email });

    if (!user) {
      return Response.json(
        { authenticated: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({
      authenticated: true,
      user: {
        _id: user._id?.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('[Auth] GET Error:', error);
    return Response.json(
      { authenticated: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
