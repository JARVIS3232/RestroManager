/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import axios from "axios";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus: MenuItem[];
  imageUrl: string;
};

type RestaurantState = {
  restaurant: Restaurant | null;
  searchedRestaurant: null;
  appliedFilter: string[];
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => Promise<void>;
  addMenuToRestaurant: (menu: any) => void;
  updatedMenuToRestaurant: (updatedMenu: any) => void;
  setAppliedFilter: (value: string) => void;
};

const API_ENDPOINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      createRestaurant: async (formData: FormData) => {
        try {
          const res = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },

      getRestaurant: async () => {
        try {
          const res = await axios.get(`${API_ENDPOINT}/`);
          if (res.data.success) {
            set({ restaurant: res.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          console.log(error);
        }
      },

      updateRestaurant: async (formData: FormData) => {
        try {
          const res = await axios.put(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ restaurant: res.data.restaurant });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },

      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines);
          const res = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          if (res.data.success) {
            set({ searchedRestaurant: res.data.restaurants });
          }
        } catch (error) {
          console.log(error);
        }
      },

      addMenuToRestaurant: (menu: any) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updatedMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state: any) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item: string) => item !== value)
            : [...state.appliedFilter, value];
          return {
            appliedFilter: updatedFilter,
          };
        });
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
