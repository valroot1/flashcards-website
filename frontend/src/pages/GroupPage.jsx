import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import FlashcardsPreview from '../components/FlashcardsPreview';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const GroupPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState({});
    const [isloading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await axios.delete(`/api/group/${id}`);
            if (res.status == 201) {
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }


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
                    <button className='font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-8'>Modify</button>
                    <button className='font-semibold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
                     onClick={handleDelete}>
                        Delete
                    </button>
                </div>
                <h2 className='mb-4 mt-4'>
                    {group.description ? (
                        <h4>{group.description}</h4>
                    ) : (
                        <h4>No description</h4>
                    )}
                </h2>
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