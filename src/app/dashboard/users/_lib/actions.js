import { api } from "@/utils/api";
import { toast } from "sonner";

export const getUsers = async () => {
    try {
        const res = await api.get(`/user`);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const createUser = async (data) => {
    try {
        const { confirm_password, ...rest } = data
        const res = await api.post(`/auth/create-user`, rest);
        if (!res.data.success) return
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.message)
        console.error("Error fetching profile data:", error);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};