
'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@/lib/data';
import { getProfile } from '@/lib/data';

// A single source of truth for auth state
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Profile | undefined>();
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Key: default to loading

  useEffect(() => {
    // This effect only runs on the client, after the initial render
    const checkAuth = () => {
        try {
            const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedInStatus);
            if (loggedInStatus) {
                const loggedInUser = getProfile(1);
                setUser(loggedInUser);
                if (loggedInUser?.role === 'baby' || loggedInUser?.id === 1) {
                    setCredits(Infinity);
                } else {
                    const storedCredits = localStorage.getItem('user_credits');
                    setCredits(storedCredits ? parseInt(storedCredits, 10) : 0);
                }
            } else {
                setUser(undefined);
                setCredits(0);
            }
        } catch (e) {
            console.error('Could not access localStorage.', e);
            setIsLoggedIn(false);
            setUser(undefined);
            setCredits(0);
        } finally {
            setIsLoading(false); // We have the client-side info now
        }
    };
    
    checkAuth();
    
    window.addEventListener('authChanged', checkAuth);
    return () => {
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  const login = (email: string, pass: string) => {
    if (email === "saytee.software@gmail.com" && pass === "admin") {
      localStorage.setItem('isLoggedIn', 'true');
      const user = getProfile(1);
      // Give daddies (not admin) 1 credit for testing purposes
      if (user?.role === 'daddy' && user.id !== 1) {
          localStorage.setItem('user_credits', '1');
      }
      window.dispatchEvent(new Event('authChanged')); // Notify all components
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_credits');
    window.dispatchEvent(new Event('authChanged')); // Notify all components
  };

  const spendCredits = (amount: number) => {
      if (user?.role === 'daddy' && user.id !== 1) {
          const newCredits = Math.max(0, credits - amount);
          setCredits(newCredits);
          localStorage.setItem('user_credits', newCredits.toString());
          return newCredits;
      }
      return credits;
  };

  return { isLoggedIn, user, isLoading, credits, login, logout, spendCredits };
}
