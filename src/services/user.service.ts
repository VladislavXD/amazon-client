import Cookies from "js-cookie";

import { IAuthResponse, IEmailPassword } from "@/src/store/user/user.interface";

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {} from "@/src/store/user/user.interface";
import axios from "axios";
import { instance } from "@/src/app/api/api.interceptor";
import { IFullUser, IUser } from "../types/user.interface";

type TypeData = {
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  phonne?: string;
};

export const UserService = {
  async getProfile() {
    return instance<IFullUser>({
      url: `/users/profile`,
      method: "GET",
    });
  },

  
  async updateProfile(data: TypeData) {
    return instance<IUser>({
      url: `/users/profile`,
      method: "PUT",
      data
    });
  },
  
  async uploadAvatar(data: TypeData) {
    return instance<IUser>({
      url: `/users/avatar`,
      method: "POST",
      data
    });
  },
  async toggleFavorite(productId: string | number) {
    return instance<IUser>({
      url: `/users/profile/favorites/${productId}`,
      method: "PATCH",
    });
  },
};
