import { createContext, useContext, useEffect, useState } from 'react';
import { useClerk } from '@clerk/clerk-react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user } = useClerk(); // Get user from Clerk
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("User from Clerk:", user); // Log user data from Clerk
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: userData }}>
      {children}
    </AuthContext.Provider>
  );
}; 