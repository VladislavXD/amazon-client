"use client";

import { UserService } from "@/src/services/user.service";
import { addToast, Image } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";

interface ImageInputProps {
  initialImage?: string;
  onImageChange?: (image: string) => void;
  clasName?: string;
}
export default function ImageInput({
  initialImage,
  onImageChange,
  clasName,
}: ImageInputProps) {
  const [preview, setPreview] = useState(initialImage);
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: (formData: FormData) => UserService.uploadAvatar(formData),
    onSuccess: (data) => {
      addToast({
        title: "✅ Фото успешно загружено",
        // description: `${product.name} успешно добавлен в корзину`,
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        hideIcon: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["get profile"],
      });
    },

    onError: (error) => {
      alert("Ошибка при загрузке");
      console.error(error);
    },
  });
  //  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //    const file = e.target.files?.[0]

  //    if (!file) return;

  //    const formData = new FormData()

  //    formData.append('avatar', file)

  //    uploadAvatar(formData)
  //  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Пример валидации
    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    // Можно сделать превью (не обязательно)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Загружаем на сервер
    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar(formData); // Функция, которая отправляет файл на сервер
  };

  return (
    <>
      {/* Картинка-кнопка */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="relative group shadow hover:shadow-md transition"
      >
        <Image
          isLoading={isPending}
          key={initialImage}
          isBlurred
          alt="Profile Avatar"
          className=" rounded-3xl group-hover:opacity-60 transition-opacity"
          src={initialImage || preview}
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
        onChange={handleFileChange}
      />
    </>
  );
}
