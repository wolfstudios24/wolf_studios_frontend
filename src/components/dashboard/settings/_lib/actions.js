import { api } from "@/utils/api";

export const getProfileData = async () => {
    try {
        const res = await api.get(`/user/profile`);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
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

    try {
        const res = await api.patch(`/user/update-profile`, formData);
        return { success: true, data: res.data.data };
    } catch (error) {
        console.error("Error updating profile data:", error);
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};
