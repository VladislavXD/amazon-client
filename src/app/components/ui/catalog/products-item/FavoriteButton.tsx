import { useActions } from "@/src/hooks/useActions";
import { useAuth } from "@/src/hooks/useAuth";
import { useCart } from "@/src/hooks/useCart";
import { useProfile } from "@/src/hooks/useProfile";
import { UserService } from "@/src/services/user.service";
import { IProduct } from "@/src/types/product.interface";
import { HeartIcon } from "@/publick/HeartIcon";
import { Button } from "@nextui-org/react";
import { current } from "@reduxjs/toolkit";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import React, { FC, useCallback } from "react";
// import { CiHeart } from "react-icons/ci";
// import { IoHeartDislikeOutline } from "react-icons/io5";
// import { PiShoppingCartSimpleThin } from "react-icons/pi";
// import { PiShoppingCartSimpleFill } from "react-icons/pi";


import {debounce} from 'lodash'

const AddToFavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile();
  const queryClient = useQueryClient();



  const { mutate } = useMutation({
    mutationKey: ["toggle favorite"],
    mutationFn: () => UserService.toggleFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get profile"] });
    },
  });



  const debounceMutate = useCallback(
    debounce(()=> {
      mutate()
    }, 500), 
  [mutate])

  if (!profile) return null;
  
  const isExists = profile.favorites.some((fav) => fav.id === productId);

  return (
    <div>
      <Button className="z-0 group relative inline-flex items-center 
      justify-center box-border appearance-none select-none 
      whitespace-nowrap font-normal subpixel-antialiased overflow-hidden 
      tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none 
      data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus 
      data-[focus-visible=true]:outline-offset-2 text-medium  rounded-large px-0 !gap-0 
      transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 min-w-12 w-12 h-12 
      data-[hover=true]:opacity-hover text-default-600"   isIconOnly onClick={() => debounceMutate()}>
        <HeartIcon 
        fill={`${isExists ? '#E0155D' : 'white'}`}
        filled={`${isExists ? '#E0155D' : ''}`}
        />
      </Button>
    </div>
  );
};

export default AddToFavoriteButton;
