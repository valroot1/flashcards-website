import React from 'react';
import { Link } from 'react-router-dom';

// ONLY VISIBLE FOR NOT AUTHENTICATED USER

const AuthScreen = () => {

    return (
        <div className="w-full font-[Nunito] flex flex-col">
            <div className="flex-1 md:flex md:px-5">
                <div className="justify-left items-start md:pt-5">
                    <div className="w-full max-w-md p-8">
                        <h2 className="text-2xl font-bold mb-6 text-left">
                            A new way of studying...
                        </h2>
                        <h3>
                            Master your favourite subjects with <strong>flashcards</strong>.
                        </h3>
                        <h3 className='mb-6'>
                            Create, test yourself and share your study collections with others!
                        </h3>
                        <Link to="/signup" className='mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors'>
                            Signup for free
                        </Link>
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
