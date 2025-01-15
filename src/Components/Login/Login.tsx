import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/AuthContext';
import axios from "axios";
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import loginImage from './../../assets/login.png';
import { toast } from 'react-toastify';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    let response;
    if (isLogin) {
      response = await axios.post('http://54.242.200.246/api/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        login(response.data.token);
        toast.success('Login successful',
          {position: "bottom-right", theme: "colored"}
        );
        //console.log('Login successful', response.data);
        navigate('/'); 
        }

    } else {
      response = await axios.post('http://54.242.200.246/api/auth/register', {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        //console.log('Registration successful', response.data);
        toast.success('Registration successful',{position: "bottom-right", theme: "colored"});
        setIsLogin(true);
        }
    }
  } catch (err) {
    //console.error('Error:', err);
    toast.error('An unexpected error', {position: "bottom-right", theme: "colored"})
  }
};

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="hidden lg:flex w-[30rem]"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={loginImage} alt="login image" />
      </motion.div>
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {!isLogin && (
            <div className="mt-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
            </div>
          )}
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <motion.button
              type="submit"
              className="border rounded-md py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </motion.button>
            <a href="#" className="text-sm text-red-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <motion.button
            onClick={handleGoogleSignIn}
            className="border rounded-md py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GoogleIcon className="mr-2" />
            Sign in with Google
          </motion.button>
        </div>
        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 cursor-pointer hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
