import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import './Auth.css';

export function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  if (user) {
    return (
      <div className="auth-status">
        <img src={user.photoURL} alt="User" />
        <span>{user.displayName}</span>
        <button onClick={logout}>Sign Out</button>
      </div>
    );
  }

  return (
    <div className="auth-cta">
        <button className="auth-btn" onClick={login}>
            <span className="google-icon">G</span> Sign in with Google
        </button>
    </div>
  );
}
