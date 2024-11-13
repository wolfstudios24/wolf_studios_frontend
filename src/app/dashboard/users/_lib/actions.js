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