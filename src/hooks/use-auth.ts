
'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@/lib/data';
import { getProfile, getProfiles, createProfile } from '@/lib/data';

type SignupResult = { user?: Profile; error?: string };
type LoginResult = Profile | null;

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
            const loggedInUserId = localStorage.getItem('loggedInUserId');
            
            setIsLoggedIn(loggedInStatus && !!loggedInUserId);
            
            if (loggedInStatus && loggedInUserId) {
                const loggedInUser = getProfile(parseInt(loggedInUserId, 10));
                setUser(loggedInUser);
                if (loggedInUser) {
                    if (loggedInUser.role === 'baby' || loggedInUser.id === 1) {
                        setCredits(Infinity);
                    } else {
                        const storedCredits = localStorage.getItem('user_credits');
                        setCredits(storedCredits ? parseInt(storedCredits, 10) : 0);
                    }
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

  const login = (email: string, pass: string): LoginResult => {
    const profiles = getProfiles();
    const foundUser = profiles.find(p => p.email && p.email.toLowerCase() === email.toLowerCase() && p.password === pass);

    if (foundUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUserId', foundUser.id.toString());
      
      // For daddies (not admin), if it's their first login (no credits stored), give them 10.
      if (foundUser.role === 'daddy' && foundUser.id !== 1) {
          const currentCredits = localStorage.getItem('user_credits');
          if (currentCredits === null) {
            localStorage.setItem('user_credits', '10');
          } 
      }
      window.dispatchEvent(new Event('authChanged'));
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('user_credits');
    window.dispatchEvent(new Event('authChanged')); // Notify all components
  };

  const signup = (email: string, password: string, role: 'baby' | 'daddy'): SignupResult => {
    const result = createProfile(email, password, role);

    if ('error' in result) {
      return { error: result.error };
    }
    
    // Automatically log in the new user
    const loggedInUser = login(email, password);
    if (loggedInUser) {
      return { user: loggedInUser };
    }
    
    return { error: 'Failed to log in after signing up.' };
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

  const addCredits = (amount: number) => {
    if (user?.role === 'daddy' && user.id !== 1) {
        const newCredits = credits + amount;
        localStorage.setItem('user_credits', newCredits.toString());
        // Dispatch event to ensure all components are aware of the credit change, like the header.
        window.dispatchEvent(new Event('authChanged'));
    }
  };

  return { isLoggedIn, user, isLoading, credits, login, logout, signup, spendCredits, addCredits };
}
