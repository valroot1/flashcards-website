import React from 'react';
import { useNavigate } from 'react-router-dom';

// ONLY VISIBLE FOR NOT AUTHENTICATED USER

const AuthScreen = () => {

    const navigate = useNavigate();
    const handleClickSignUp = () => {
        navigate("/signup");
    }

    const handleClickLogin = () => {
        navigate("/login");
    }

    return (
        <div className="w-full font-[Nunito] flex flex-col">

            <header className="flex items-center p-4 shadow-md justify-between gap-2 sm:gap-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-wide">
                    FlashLearn
                </h1>
                <div className='flex gap-4 sm:gap-8 sm:px-4'>
                    <button onClick={handleClickSignUp} className='font-semibold text-blue-600 px-2 sm:px-4 hover:underline'>
                        SignUp
                    </button>
                    <button onClick={handleClickLogin} className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-8 rounded-lg font-semibold transition-colors whitespace-nowrap'>
                        Login
                    </button>
                </div>
            </header>

            <div className="flex-1 md:flex md:px-5">
                <div className="justify-left items-start md:pt-5">
                    <div className="w-full max-w-md p-8">
                        <h2 className="text-2xl font-bold mb-6 text-left">
                            A new way of studying...
                        </h2>
                        <h3>
                            Master your favourite subjects with <strong>flashcards</strong>.
                        </h3>
                        <h3>
                            Create, test yourself and share your study collections with others!
                        </h3>
                        <button onClick={handleClickSignUp} className='mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors'>
                            Signup for free
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex justify-left order-2 md:order-2 p-4">
                    <img
                        src="/signup.png"
                        alt="Signup illustration"
                        className="object-scale-down"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
