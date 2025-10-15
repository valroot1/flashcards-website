import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import FlashcardsPreview from '../components/FlashcardsPreview';
import { Loader } from 'lucide-react';

const GroupPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState({});
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const getGroup = async () => {
            try {
                const res = await axios.get(`/api/group/${id}`);
                setGroup(res.data.data);
            } catch (error) {
                if (error.response?.status === 404) {
                    setGroup({});
                }
            } finally {
                setIsLoading(false);
            }
        }

        getGroup();
    }, [id]);


    if (isloading) {
        return (
            <div className='h-screen'>
                <div className='flex justify-center items-center bg-white h-full'>
                    <Loader className='animate-spin text-blue-600 size-10' />
                </div>
            </div>
        );
    }

    return (
        <div className='w-full font-[Nunito] flex flex-col'>
            <div className='gap-4 mt-2 w-full p-8'>
                <Link to="/">
                    <img
                        src="/back.png"
                        alt="Go back image"
                        className="w-8 h-8 object-contain mb-5"
                    />
                </Link>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-bold text-left mr-10'>{group.name}</h1>
                    <Link className='text-xl font-semibold mb-6 text-left mr-10'>EDIT</Link>
                </div>
                <h2 className='mb-4'>{group.description}</h2>
                <Link
                    to={`/group/${id}/start`}
                    className='font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    Start
                </Link>
                <h3 className='mt-8'> Your flashcards </h3>
                <hr className='border-t-2 md:w-auto' />
                <FlashcardsPreview />
            </div>
        </div>
    );
};

export default GroupPage;