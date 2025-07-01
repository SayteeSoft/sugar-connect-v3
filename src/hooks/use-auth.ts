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
                        const creditsKey = `user_credits_${loggedInUser.id}`;
                        let currentCredits = localStorage.getItem(creditsKey);
                        
                        // Give new daddies 10 credits on their first login
                        if (currentCredits === null) {
                            currentCredits = '10';
                            localStorage.setItem(creditsKey, currentCredits);
                        }
                        // Special logic for Larry Saytee (ID 13) to "refill" credits if he runs out
                        else if (loggedInUser.id === 13 && currentCredits === '0') {
                            currentCredits = '10';
                            localStorage.setItem(creditsKey, currentCredits);
                        }
                        setCredits(currentCredits ? parseInt(currentCredits, 10) : 0);
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
      
      // The logic for setting initial/refill credits is now in `checkAuth`
      // which will be triggered by this event.
      window.dispatchEvent(new Event('authChanged'));
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUserId');
    // Don't remove credits on logout so they persist
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
          const creditsKey = `user_credits_${user.id}`;
          localStorage.setItem(creditsKey, newCredits.toString());
          setCredits(newCredits);
          return newCredits;
      }
      return credits;
  };

  const addCredits = (amount: number) => {
    if (user?.role === 'daddy' && user.id !== 1) {
        const creditsKey = `user_credits_${user.id}`;
        const currentCredits = parseInt(localStorage.getItem(creditsKey) || '0', 10);
        const newCredits = currentCredits + amount;
        localStorage.setItem(creditsKey, newCredits.toString());
        // Dispatch event to ensure all components are aware of the credit change, like the header.
        window.dispatchEvent(new Event('authChanged'));
    }
  };

  return { isLoggedIn, user, isLoading, credits, login, logout, signup, spendCredits, addCredits };
}
