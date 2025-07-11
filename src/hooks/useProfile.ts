import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { IFullUser   } from "../types/user.interface";
import { useAuth } from "./useAuth";

export const useProfile = () => {

  const {user} = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => UserService.getProfile(),
    select: ({data}) => data ,
    
    enabled: !!user
  });
  
  return { profile: data, isLoading, isError}
}


// export const useUpdateProfile = () => {
//   const { user} = useAuth()
//   return useQuery({
//     queryKey: ['update profile'],
//     queryFn: (data: any) => UserService.updateProfile(data),
//     enabled: !!user,
//     select: ({data}) => data
//   });
// }