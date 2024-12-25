import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

export const AuthContext = createContext();
// const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('sellerToken'));
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/seller/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, seller } = response.data;
        setToken(token);
        setSeller(seller);
        localStorage.setItem('sellerToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/');
        toast.success('Login successful!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/seller/register`,formData);

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setSeller(null);
    localStorage.removeItem('sellerToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = localStorage.getItem('sellerToken');
      
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        setupAxiosAuth(storedToken);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/seller/profile`
        );

        if (response.data.success) {
          setToken(storedToken);
          setSeller(response.data.seller);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('sellerToken');
          setToken(null);
          setSeller(null);
          setupAxiosAuth(null);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ token, seller, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};