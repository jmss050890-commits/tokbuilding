import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.replace('/tokhealth/login');
        }
      } catch {
        router.replace('/tokhealth/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-green-200 text-lg">Loading...</div>;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
