import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState({ name: 'Ben' });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // useEffect(() => checkUserLoggedIn(), [checkUserLoggedIn]);

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const res = await fetch(`${NEXT_URL}/api/user`);
  //     console.log(res);
  //     const data = await res.json();

  //     if (res.ok) {
  //       setUser(data.user);
  //     } else {
  //       setUser(null);
  //     }
  //   };

  //   checkUserLoggedIn(user);
  // });

  // Register User
  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    // console.log({ identifier, password });

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    // console.log(data);

    if (res.ok) {
      setUser(data.user);
      // router.push('/account/dashboard');
    } else {
      // setError(data.message);
      // toast.error(data.message);
      setError(null);
    }
  };

  // Logout User
  const logout = async () => {
    // console.log('Logout');
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if use is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
