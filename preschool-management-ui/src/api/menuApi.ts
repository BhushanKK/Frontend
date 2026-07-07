import api from "./axios";
import type { Menu, MenuFormValues, MenuResponse, DropdownResponse } from "../masters/menu/types/menu";
import type { ApiResponse } from "../types/auth";
import { getRoles } from "./roleApi";

const BASE_URL = "/MenuMaster";

// Get All Menus
export const getMenus = async () => {
    const response = await api.get<MenuResponse>(BASE_URL);
    return response.data;
};

// Get Menu By Id
export const getMenuById = async (id: number) => {
    const response = await api.get<ApiResponse<Menu>>(`${BASE_URL}/${id}`);
    return response.data;
};

// Create Menu
export const createMenu = async (data: MenuFormValues) => {
    const response = await api.post<ApiResponse<Menu>>(BASE_URL, data);
    return response.data;
};

// Update Menu
export const updateMenu = async (
    id: number,
    data: MenuFormValues
) => {
    const response = await api.put<ApiResponse<Menu>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

// Delete Menu
export const deleteMenu = async (id: number) => {
    const response = await api.delete<ApiResponse<Menu>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

// Parent Menu Dropdown
export const getParentMenus = async () => {
    const response = await api.get<DropdownResponse>(
        `${BASE_URL}/ParentMenus`
    );

    return response.data;
};

export const getAllRoles = async () => {
    return await getRoles();
};
