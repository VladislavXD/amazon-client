import Cookies from "js-cookie";

import { IAuthResponse, IEmailPassword } from "@/app/store/user/user.interface";

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {} from "@/app/store/user/user.interface";
import axios from "axios";
import { instance } from "@/app/api/api.interceptor";
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
  async toggleFavorite(productId: string | number) {
    return instance<IUser>({
      url: `/users/profile/favorites/${productId}`,
      method: "PATCH",
    });
  },
};