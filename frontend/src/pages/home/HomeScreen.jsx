import React, { useState } from 'react';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';
import GroupsPreview from '../../components/GroupsPreview';
import AddGroupPage from '../AddGroupPage';
import toast from 'react-hot-toast';

// ONLY VISIBLE FOR AUTHENTICATED USER

const HomeScreen = () => {
  const { user } = useAuthStore();
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ refreshKey, setRefreshKey ] = useState(0);

  const handleAddGroup = () => {
    setIsDialogOpen(false);
    setRefreshKey(prev => prev + 1);
    toast.success('New group succesfully created');
  };

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
        <GroupsPreview 
          key={refreshKey}
          onOpenAddDialog={() => setIsDialogOpen(true)}
        />
      </div>
      <AddGroupPage 
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      onAddGroup={handleAddGroup}/>
    </div>
  );
};

export default HomeScreen;
