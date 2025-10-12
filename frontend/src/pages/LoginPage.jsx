import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authUser';

const LoginPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  //const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if(success) {
      window.location.href = "/";
    }
  }
  
  return (
    <div className="w-full font-[Nunito] flex flex-col">
      <div className="flex-1 md:flex">
        <div className="flex-1 flex justify-left items-center order-2 md:order-1 px-10">
          <div className="w-full max-w-md p-8">
            <h2 className="text-2xl font-bold  mb-6 text-left">
              Welcome back!
            </h2>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Loading..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="flex-1 flex justify-left order-2 md:order-2 p-4">
          <img
            src="/login.png"
            alt="Signup illustration"
            className="object-scale-down"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;