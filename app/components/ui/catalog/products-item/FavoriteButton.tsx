import { useActions } from "@/app/hooks/useActions";
import { useAuth } from "@/app/hooks/useAuth";
import { useCart } from "@/app/hooks/useCart";
import { useProfile } from "@/app/hooks/useProfile";
import { UserService } from "@/app/services/user.service";
import { IProduct } from "@/app/types/product.interface";
import { HeartIcon } from "@/publick/HeartIcon";
import { Button } from "@nextui-org/react";
import { current } from "@reduxjs/toolkit";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import React, { FC } from "react";
import { CiHeart } from "react-icons/ci";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

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

  if (!profile) return null;
  
  const isExists = profile.favorites.some((fav) => fav.id === productId);

  return (
    <div>
      <Button aria-label="like"  isIconOnly onClick={() => mutate()}>
        <HeartIcon 
        fill={`${isExists ? '#E0155D' : 'white'}`}
        filled={`${isExists ? '#E0155D' : ''}`}
        />
      </Button>
    </div>
  );
};

export default AddToFavoriteButton;
