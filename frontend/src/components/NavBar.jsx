// components/NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const NavBar = () => {
  const { user, logout, isLoggingOut } = useAuthStore();
  const location = useLocation();

  const handleClickLogout = async (e) => {
    e.preventDefault();
    const success = await logout();
    if (success) {
      window.location.href = "/";
    }
  }

  return (
    <header className="flex items-center p-4 shadow-md justify-between gap-2 sm:gap-8 bd-white">
      {location.pathname === "/" ? (
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-wide">
          FlashLearn
        </h1>
      ) : (
        <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-wide">
          FlashLearn
        </Link>
      )}
      <div className='flex gap-4 sm:gap-8 sm:px-4'>
        {user ? (
          // NAVBAR PER UTENTI AUTENTICATI
          <button
            disabled={isLoggingOut}
            onClick={handleClickLogout}
            className='font-semibold text-blue-600 px-2 sm:px-4 hover:underline disabled:opacity-50'
          >
            {isLoggingOut ? "Loading..." : "Logout"}
          </button>
        ) : (
          // NAVBAR PER UTENTI NON AUTENTICATI
          <div>
            <Link
              to="/signup"
              className='font-semibold text-blue-600 px-2 sm:px-4 hover:underline'
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className='font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;