import { useProfile } from "@/src/hooks/useProfile";
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
import { toInteger } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfileModal({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
    const { profile } = useProfile();

  
  const   {handleSubmit,  control} = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
      description: "",
    }
  })

 
  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile (in development)
              </ModalHeader>
              <ModalBody className="flex  ">
                <div className="gap-4 w-full">
                  <Form
                    className="flex flex-col gap-4"

                  >
                  
                    <div className="flex gap-4 w-full">
                      <Input
                      label="Name"
                      type="text"
                      defaultValue={profile?.name}

                      />
                      <Input 
                      label="Phone number" 

                      defaultValue={profile?.phone || ""}

                      />
                    </div>
                    <Textarea
                      isRequired
                      max={120}
                      className="w-full"
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Enter your description"
                    />
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit"  onPress={()=> handleSubmit}>
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
