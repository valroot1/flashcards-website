import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const FlashcardsPreview = () => {
    const { id } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getFlashcards = async () => {
            try {
                const res = await axios.get(`/api/flashcard/group/${id}`);
                setFlashcards(res.data.data);
            } catch (error) {
                if (error.response.status("404")) {
                    setFlashcards([]);
                }
            } finally {
                setIsLoading(false);
            }
        }
        getFlashcards();
    }, [id]);


    if (isLoading) {
        return (
            <div className='h-screen'>
                <div className='flex justify-center items-center bg-white h-full'>
                    <Loader className='animate-spin text-blue-600 size-10' />
                </div>
            </div>
        );
    }

    if (flashcards.length === 0) {
        return (
            <div className='h-screen'>
                <div className='flex justify-center items-center bg-white h-full'>
                    <p className='text-gray-600 text-lg'>No flashcards found</p>
                </div>
            </div>
        );
    }


    return (
        <div className='flex gap-4 mt-5'>
            {flashcards.map((item) => (
                <Link
                    id={item._id}
                    to={`flashcard/${item._id}`}
                    className='h-10 flex flex-col items-center justify-center border-2 hover:border-4 bg-white text-black font-bold rounded-xl transition-all p-4'>
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default FlashcardsPreview;
