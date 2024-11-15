import { api, publicApi } from "@/utils/api";
import { toast } from "sonner";

export const getUsers = async () => {
    try {
        const res = await api.get(`/user`);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const createUser = async (data, isPublicRegistration = false) => {
    try {
        const { confirm_password, status, ...rest } = data
        let res = ""
        console.log(isPublicRegistration, "isPublic registration.....")
        if (isPublicRegistration) {
            res = await publicApi.post(`/auth/create-user`, rest);
        } else {
            res = await api.post(`/auth/create-user`, rest);
        }
        if (!res.data.success) return
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const updateUserData = async (data) => {
    try {
        const payload = {
            role: data.role,
            is_deleted: data.is_deleted,
            status: data.status,
            contact_number: data.contact_number
        }
        const res = await api.patch(`/user/update-user/${data.id}`, payload);
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.response.data.message);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};