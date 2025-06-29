
'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@/lib/data';
import { getProfile } from '@/lib/data';

// A single source of truth for auth state
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true); // Key: default to loading

  useEffect(() => {
    // This effect only runs on the client, after the initial render
    const checkAuth = () => {
        try {
            const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedInStatus);
            if (loggedInStatus) {
                // In a real app, you'd fetch the user profile here.
                // For this demo, we get it from our local data source.
                setUser(getProfile(1));
            } else {
                setUser(undefined);
            }
        } catch (e) {
            console.error('Could not access localStorage.', e);
            setIsLoggedIn(false);
            setUser(undefined);
        } finally {
            setIsLoading(false); // We have the client-side info now
        }
    };
    
    checkAuth();
    
    window.addEventListener('authChanged', checkAuth);
    return () => {
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []); // Empty dependency array means this runs once on mount

  const login = (email: string, pass: string) => {
    if (email === "saytee.software@gmail.com" && pass === "admin") {
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('authChanged')); // Notify all components
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('authChanged')); // Notify all components
  };

  return { isLoggedIn, user, isLoading, login, logout };
}
