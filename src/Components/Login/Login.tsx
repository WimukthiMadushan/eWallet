import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import loginImage from './../../assets/login.png'; 

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement your authentication logic here

    console.log(`${isLogin ? 'Login' : 'Signup'} attempt with:`, { email, password });
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth logic here
    console.log('Google Sign-In');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="hidden lg:flex w-[30rem]">
        <img src={loginImage} alt="login image" />
      </div>
      <div className="w-full max-w-md p-8 bg-white">
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="mt-4">
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
            <button type="submit" className="border rounded-md py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <a href="#" className="text-sm text-red-600 hover:underline">Forgot password?</a>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button onClick={handleGoogleSignIn} className="border rounded-md py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md">
            <GoogleIcon className="mr-2" />
            Sign in with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)} className="text-red-600 cursor-pointer hover:underline">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
