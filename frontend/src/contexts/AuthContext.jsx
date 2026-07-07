import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hh-user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem('hh-user', JSON.stringify(u));
    else localStorage.removeItem('hh-user');
  };

  const loginWithCredentials = (email, password, role = 'contestant') => {
    // Frontend-only mock validation. Any non-empty pair works.
    if (!email || !password) throw new Error('Please enter email and password.');
    persist({
      email,
      name: email.split('@')[0],
      role,
      provider: 'credentials',
      avatar: email.slice(0, 2).toUpperCase(),
    });
  };

  const loginWithProvider = (provider, role = 'contestant') => {
    const seed = provider === 'google' ? 'user.google@hackhub.dev' : 'user.github@hackhub.dev';
    persist({
      email: seed,
      name: provider === 'google' ? 'Google User' : 'GitHub User',
      role,
      provider,
      avatar: provider === 'google' ? 'GU' : 'GH',
    });
  };

  const signup = ({ name, email, password, role = 'contestant' }) => {
    if (!name || !email || !password) throw new Error('All fields are required.');
    persist({
      email,
      name,
      role,
      provider: 'credentials',
      avatar: name.slice(0, 2).toUpperCase(),
    });
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, loginWithCredentials, loginWithProvider, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
