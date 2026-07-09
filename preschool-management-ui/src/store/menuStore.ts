import { create } from "zustand";
import { getMenus } from "../api/menuApi";
import type { Menu } from "../masters/menu/types/menu";

interface MenuState {
    menus: Menu[];
    loadMenus: () => Promise<void>;
    clearMenus: () => void;
    getMenuByUrl: (url: string) => Menu | undefined;
}

export const useMenuStore = create<MenuState>((set, get) => ({
    menus: [],
    loadMenus: async () => {
        try {
            const response = await getMenus(true);
            set({
                menus: response.data,
            });
        } catch (error) {
            console.error("Failed to load menus", error);
            set({
                menus: [],
            });
        }
    },

    clearMenus: () =>
        set({
            menus: [],
        }),
    getMenuByUrl: (url: string) =>
        get().menus.find(x => x.menuUrl === url),
}));