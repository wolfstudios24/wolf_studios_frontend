import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

// Login API
async function signInWithPassword({ email, password }) {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}


export function useSignIn() {
    return useMutation({
        mutationFn: signInWithPassword,
        onError: (error) => {
            console.error('Sign-in error:', error.message);
        },
    });
}