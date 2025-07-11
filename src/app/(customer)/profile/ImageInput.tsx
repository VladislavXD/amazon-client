"use client";

import { UserService } from "@/src/services/user.service";
import { Image } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";

interface ImageInputProps {
  initialImage?: string;
  onImageChange?: (image: string) => void;
  clasName?: string
}
export default function ImageInput({ initialImage, onImageChange, clasName }: ImageInputProps) {
  const [preview, setPreview] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [isUploading, setIsUploading] = useState(false);
  // const queryClient = useQueryClient();


 

 
  return (
    <>
      {/* Картинка-кнопка */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="relative group shadow hover:shadow-md transition"
      >
        <Image
          key={initialImage}
          isBlurred
          alt="Profile Avatar"
          className=" rounded-3xl group-hover:opacity-60 transition-opacity"
          src={ initialImage || preview }
          width={220}
          height={220}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
          <FaRegEdit className="text-2xl text-primary-700" />
        </span>
      </button>

      {/* Скрытый input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        // onChange={handleFileChange}
      />
    </>
  );
}
