import api from "./axios";

import type {
    CommitteeMaster,
    CommitteeMasterFormValues,
    CommitteeMasterResponse,
} from "../masters/committee/types/committee";

import type { ApiResponse } from "../types/auth";

const BASE_URL = "/CommitteeMaster";

// Get All
export const getCommittees = async (filter: boolean) => {
    const response = await api.get<CommitteeMasterResponse>(
        `${BASE_URL}/${filter}`
    );

    return response.data;
};

// Get By Id
export const getCommitteeById = async (id: string) => {
    const response = await api.get<ApiResponse<CommitteeMaster>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

// Create
export const createCommittee = async (
    data: CommitteeMasterFormValues
) => {
    const formData = new FormData();

    formData.append("CommitteeName", data.committeeName);
    formData.append("Slogan", data.slogan ?? "");
    formData.append("IsActive", String(data.isActive));

    if (data.logo instanceof File) {
        formData.append("Logo", data.logo);
    }

    const response = await api.post<ApiResponse<string>>(
        BASE_URL,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// Update
export const updateCommittee = async (
    id: string,
    data: CommitteeMasterFormValues
) => {
    const formData = new FormData();

    formData.append("CommitteeName", data.committeeName);
    formData.append("Slogan", data.slogan ?? "");
    formData.append("IsActive", String(data.isActive));

    if (data.logo instanceof File) {
        formData.append("Logo", data.logo);
    }

    const response = await api.put<ApiResponse<string>>(
        `${BASE_URL}/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// Delete
export const deleteCommittee = async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};