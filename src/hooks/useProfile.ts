import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { IFullUser   } from "../types/user.interface";
import { useAuth } from "./useAuth";

export const useProfile = () => {

  const {user} = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => UserService.getProfile(),
    select: (data) => data ,
    
    enabled: !!user,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return { profile: data}
}
