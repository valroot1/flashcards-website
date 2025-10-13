import React from 'react';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';
import GroupsPreview from '../../components/GroupsPreview';

// ONLY VISIBLE FOR AUTHENTICATED USER

const HomeScreen = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full font-[Nunito] flex flex-col">
      <div className="w-full p-8">
        <h2 className="text-2xl font-bold mb-6 text-left">
          Hi, {user.username}!
        </h2>
        <h3>
          Your study groups
        </h3>
        <hr className='border-t-2 md:w-auto'/>
        <GroupsPreview />
      </div>
    </div>
  );
};

export default HomeScreen;
