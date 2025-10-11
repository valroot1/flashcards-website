import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth : true,
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
    authCheck: async () => {
        set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/auth/authCheck");
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			toast.error(error.response.data.message || "An error occurred");
		}
    },
}))