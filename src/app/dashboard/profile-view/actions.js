import { api } from "@/utils/api";

export const getProfileData = async () => {
    const res = await api.get(`/user/profile`);
    return res.data.data;
};