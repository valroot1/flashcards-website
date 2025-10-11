import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
//axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth : true,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const response = await axios.post("/api/auth/signup", credentials);
            set({user:response.data.user, isSigningUp: false});
            toast.success("Signup successfull");
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({user: null, isSigningUp: false});
        }
    },
    login: async (credentials) => {
        set({isLoggingIn: true});
        try {
            const response = await axios.post("/api/auth/login", credentials);
            set({user:response.data.user, isLoggingIn: false});
            toast.success("Login successfull");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({user: null, isLoggingIn: false});
        }
    },
    logout: async () => {},
    authCheck: async () => {
        set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/auth/authCheck");
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			//toast.error(error.response.data.message || "An error occurred");
		}
    },
}))