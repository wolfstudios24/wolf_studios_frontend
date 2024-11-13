import { api } from "@/utils/api";

export const getProfileData = async () => {
    const res = await api.get(`/user/profile`);
    return res.data.data;
};


export const updateProfileData = async (data) => {
    let formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("profile_pic", data.profile_pic);
    formData.append("contact_number", data.contact_number);
    formData.append("status", data.status);
    formData.append("role", data.role);

    const res = await api.patch(`/user/update-profile`, formData);
    return res.data.data;
};