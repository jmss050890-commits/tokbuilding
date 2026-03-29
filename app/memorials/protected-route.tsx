'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for auth token in localStorage
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      router.push('/memorials/login');
      return;
    }

    // Simple validation - in production, you'd validate token with server
    try {
      const parts = token.split('.');
      if (parts.length !== 2) {
        localStorage.removeItem('auth_token');
        router.push('/memorials/login');
        return;
      }
      
      // Token exists and has valid format
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Auth validation error:', error);
      localStorage.removeItem('auth_token');
      router.push('/memorials/login');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-amber-100">Loading your Legacy Vault...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Router will handle redirect
  }

  return <>{children}</>;
}
