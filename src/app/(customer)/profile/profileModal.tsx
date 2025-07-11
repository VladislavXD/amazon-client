import { useProfile } from "@/src/hooks/useProfile";
import { UserService } from "@/src/services/user.service";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Form,
} from "@heroui/react";
import { isPending } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toInteger } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfileModal({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { profile } = useProfile();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: formSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
      email: profile?.email || "",
      description: profile?.description || "",
    },
  });

  // Update handleSubmit function to use formSubmit

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        phone: profile.phone || "",
        description: profile.description || "",
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["toggle favorite"],
    mutationFn: (data: any) => UserService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get profile"] });
      onOpenChange?.(false);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const handleSubmit = formSubmit((data) => {
    console.log("Form submitted with data:", data);
    mutate(data);
  });

  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        key={toInteger(profile?.id)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile (in development)
              </ModalHeader>
              <ModalBody className="flex">
                <div className="gap-4 w-full">
                  <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4 w-full">
                      <Input
                        label="Name"
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                      />
                      <Input
                        label="Phone number"
                        type="text"
                        {...register("phone")}
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone ? errors.phone.message : ""}
                      />
              
                    </div>
                    <Textarea
                      max={120}
                      className="w-full"
                      label="Description"
                      labelPlacement="outside"
                      {...register("description")}
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message}
                      placeholder="Enter your description"
                    />
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                  // @ts-ignore 
                  onPress={handleSubmit}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
