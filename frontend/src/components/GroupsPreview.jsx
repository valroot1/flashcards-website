import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GroupsPreview = () => {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getGroups = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get("/api/group/");
                setGroups(res.data.data);
            } catch (err) {
                console.error("Errore nel caricamento dei gruppi:", err);
            } finally {
                setIsLoading(false);
            }
        };
        getGroups();
    }, []);

    const truncateText = (text, max_length = 20) => {
        if(!text) return '';
        return text.length > max_length ? text.substring(0, max_length)+'...' : text;
    }

    if (isLoading) {
        return <div className="text-black">Loading...</div>;
    }

    if (groups.length === 0) {
        console.log("No Gruppo");
        return <div className="text-black">Nessun gruppo trovato.</div>;
    }

    return (
        <div className='flex gap-4 mt-5'>
            {groups.map((item) => (
                <Link
                    key={item.id}
                    to={`/group/${item._id}`}
                    className='w-50 h-32 flex flex-col items-center justify-center border-2 hover:border-4 font-semibold bg-white text-black rounded-lg transition-all p-4'>
                    <h3 className='font-bold text-center mb-2'>{item.name}</h3>
                    {item.description ? (
                        <h4 className='text-sm text-center'>{truncateText(item.description)}</h4>
                    ) : (
                        <h4 className='text-gray-500 text-sm text-center'>No description</h4>
                    )}
                </Link>
            ))}
        </div>
    );
};

export default GroupsPreview;
