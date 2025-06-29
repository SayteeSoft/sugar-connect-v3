
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Profile } from '@/lib/data';
import { getProfile } from '@/lib/data';

// A single source of truth for auth state
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<Profile | undefined>();

  const recheckAuth = useCallback(() => {
    const loggedInStatus = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    if (loggedInStatus) {
      setUser(getProfile(1));
    } else {
      setUser(undefined);
    }
  }, []);

  useEffect(() => {
    recheckAuth();
    // Listen for custom event to re-check auth when it changes elsewhere
    window.addEventListener('authChanged', recheckAuth);
    return () => {
      window.removeEventListener('authChanged', recheckAuth);
    };
  }, [recheckAuth]);

  const login = useCallback((email: string, pass: string) => {
    if (email === "saytee.software@gmail.com" && pass === "admin") {
      localStorage.setItem('isLoggedIn', 'true');
      recheckAuth(); // Update state
      return true;
    }
    return false;
  }, [recheckAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    recheckAuth(); // Update state
  }, [recheckAuth]);

  return { isLoggedIn, user, isLoading: isLoggedIn === undefined, login, logout };
}
