import React, { useState } from 'react';
import { useAuthStore } from '../store/authUser';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddGroupPage = ({ isOpen, onClose, onAddGroup }) => {
  const { user } = useAuthStore();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const [isAddingGroup, setIsAddingGroup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName) {
      toast.error('Name is required.');
      return;
    }

    try {
      setIsAddingGroup(true);
      const res = await axios.post("/api/group/", { user, name: groupName, description });
      if (res.status == 201) {
        onAddGroup(res.data.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error creating group. Please retry.');
      }
    } finally {
      setIsAddingGroup(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className='m-5'>
          <header className='font-bold text-xl'>
            New Group
          </header>
          <hr />
          <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Group name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="description"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className='flex justify-center gap-8'>
              <button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                disabled={isAddingGroup}
              >
                {isAddingGroup ? "Loading..." : "Create"}
              </button>
              <button
                type="cancel"
                className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGroupPage;
