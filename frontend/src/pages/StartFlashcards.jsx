import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const StartFlashcards = () => {

  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handlePrev = () => {
    if(currentIndex > 0) {
      setCurrentIndex(currentIndex-1);
    } else {
      toast.error("There are no previous flashcards");
    }
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.error("There are no more flashcards");
    }
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
    <div>
      <div className='flex flex-col p-4'>
        PROGRESS BAR
        <p>{currentIndex + 1}/{flashcards.length}</p>
      </div>

      <h2 className='bg-white rounded-lg text-center font-bold text-3xl mx-auto flex items-center justify-center' style={{ width: '50%', height: '40vh' }}>
        {flashcards[currentIndex].title}
      </h2>

      <div className='flex justify-center mt-5'>
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
