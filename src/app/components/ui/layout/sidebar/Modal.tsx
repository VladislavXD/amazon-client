import { useActions } from '@/src/hooks/useActions';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, RadioGroup, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { CiCircleMinus } from "react-icons/ci";



const LogOutModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const {onOpen} = useDisclosure();

  const {logout} = useActions()

  return (
    <div className="absolute">
    
    <Modal
      isOpen={isOpen} 
      placement={'auto'}
      onOpenChange={onOpenChange} 
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log out</ModalHeader>
            <ModalBody>
              <p> 
              Do you really want to go out?
              </p>  
              
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={()=> logout()} onPress={onClose}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </div>
  )
}

export default LogOutModal