import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
//axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isLoggingOut: false,
    signup: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post("/api/auth/signup", credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Signup successfull");
            return true;
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({ user: null, isSigningUp: false });
            return false;
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post("/api/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Login successfull");
            return true;
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({ user: null, isLoggingIn: false });
            return false;
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
            return true;
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response.data.message || "Logout failed");
            return false;
        }
    },
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