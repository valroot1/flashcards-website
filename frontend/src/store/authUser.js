import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const response = await axios.post("/api/auth/signup", credentials);
            set({user:response.data.user})
            toast.success("Signup successfull");
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({user: null, isSigningUp: false});
        }
    },
    login: async () => {},
    logout: async () => {},
    authCheck: async () => {},
}))