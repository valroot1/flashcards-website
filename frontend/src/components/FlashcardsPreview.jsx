import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const FlashcardsPreview = () => {
    const { id } = useParams();
    const [ flashcards, setFlashcards ] = useState([]);

    useEffect(() => {
        const getFlashcards = async () => {
            try {
                const res = await axios.get(`/api/flashcard/group/${id}`);
                setFlashcards(res.data.data);
            } catch (error) {
                if (error.response.status("404")) {
                    setFlashcards([]);
                }
            }
        }
        getFlashcards();
    },[id]);
  return (
    <div className='flex gap-4 mt-5'>
        {flashcards.map((item) => (
            <Link 
            id={item._id}
            to={`flashcard/${item._id}`}
            className='w-20 h-10 flex flex-col items-center justify-center border-2 hover:border-4 bg-white text-black font-bold rounded-xl transition-all p-4'>
                {item.title}
            </Link>
        ))}
    </div>
  );
};

export default FlashcardsPreview;
