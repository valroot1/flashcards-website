import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const StartFlashcards = () => {

  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getFlashcards = async () => {
      try {
        const res = await axios.get(`/api/flashcard/group/${id}`);
        setFlashcards(res.data.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setFlashcards([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getFlashcards();
  }, [id]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    } else {
      toast.error("There are no previous flashcards");
    }
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      toast.error("There are no more flashcards");
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  if (isLoading) {
    return <div className='h-screen'>
      <div className='flex justify-center items-center bg-white h-full'>
        <Loader className='animate-spin text-blue-600 size-10' />
      </div>
    </div>
  }

  if (flashcards.length === 0) {
    return <div> No flashcard found. </div>
  }

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between px-20 mb-10'>
        <button onClick={() => navigate(`/group/${id}`)} className='cursor-pointer'>
          <img
            src="/back.png"
            alt="Go back image"
            className="w-10 h-10"
          />
        </button>

        <div className='flex-1 mx-10'>
          <div className='bg-gray-200 rounded-full h-3'>
            <div
              className='bg-blue-600 h-3 rounded-full transition-all duration-300'
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className='mx-auto cursor-pointer'
        style={{ width: '50%', height: '40vh', perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div
          className='relative w-full h-full transition-transform duration-400'
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'
          }}
        >
          {/* TITLE */}
          <div
            className='absolute w-full h-full bg-white rounded-lg flex items-center justify-center'
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h2 className='font-bold text-3xl text-center px-8'>
              {flashcards[currentIndex].title}
            </h2>
          </div>

          {/* DEFINITION */}
          <div
            className='absolute w-full h-full bg-white rounded-lg flex items-center justify-center'
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)'
            }}
          >
            <p className='text-xl text-center px-8'>
              {flashcards[currentIndex].definition}
            </p>
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-5 gap-4'>
        <button onClick={handlePrev} className='font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
          Prev
        </button>
        <button onClick={handleNext} className='font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
          Next
        </button>
      </div>
    </div>
  );
};

export default StartFlashcards;