import { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

export const UserAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Mock login for development - replace with actual API call
      const mockUser = {
        id: 1,
        email: credentials.email,
        name: credentials.name || 'User Name',
        phone: credentials.phone || '',
        interests: credentials.interests || []
      };
      
      const mockToken = 'mock-user-token-' + Date.now();
      
      localStorage.setItem('userToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setIsAuthenticated(true);
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration for development - replace with actual API call
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone || '',
        interests: userData.interests || []
      };
      
      const mockToken = 'mock-user-token-' + Date.now();
      
      localStorage.setItem('userToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setIsAuthenticated(true);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

