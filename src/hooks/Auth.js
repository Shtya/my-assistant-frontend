// Example usage in a client component
'use client'

import { useEffect, useState } from 'react';

export function Auth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/get-user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

 
  return {user , loading}
}