import { getSearchQuery } from "@/helper/common";
import { api, publicApi } from "@/utils/api";
import { toast } from "sonner";

export const getRecordList = async (queryParams) => {

    try {
        const searchQuery = getSearchQuery(queryParams);
        const res = await api.get(`/record${searchQuery}`);
        return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};
export const getRecord = async (id) => {

    try {
        const res = await api.get(`/record?id=${id}`);
        if(!res.data.success) return
        return { success: true, data: res.data.data[0] };
    } catch (error) {
        toast.error(error.message)
        return { success: false, error: error.response ? error.response.data : "An unknown error occurred" };
    }
};

export const createRecord = async (data) => {
    try {
        const { ...rest } = data
        let res = await api.post(`/record/add-record`, rest);
    
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