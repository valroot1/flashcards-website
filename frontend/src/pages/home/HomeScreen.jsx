import React from 'react';
import AuthScreen from './AuthScreen';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authUser';

// ONLY VISIBLE FOR AUTHENTICATED USER

const HomeScreen = () => {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useAuthStore();

  const handleClickLogout = async (e) => {
    e.preventDefault();
    const success = await logout();
    if (success) {
      navigate("/");
    }
  }

  return (
    <div className="w-full font-[Nunito] flex flex-col">

      <header className="flex items-center p-4 shadow-md justify-between gap-2 sm:gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-wide">
          FlashLearn
        </h1>
        <div className='flex gap-4 sm:gap-8 sm:px-4'>
          <button onClick={handleClickLogout} className='font-semibold text-blue-600 px-2 sm:px-4 hover:underline'>
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default HomeScreen;
