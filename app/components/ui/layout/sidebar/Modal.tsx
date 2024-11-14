import { useActions } from '@/app/hooks/useActions';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, RadioGroup, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { CiCircleMinus } from "react-icons/ci";

type Props = {}

const LogOut = (props: Props) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const {logout} = useActions()

  return (
    <div className="absolute">
    <Button isIconOnly  startContent={<CiCircleMinus className='size-7 sm:m-0 m-auto'/>} onPress={onOpen} className=" sm:w-60 text-sm pl-0 sm:pl-3 flex justify-start " color='danger' variant='bordered'>
      <p className='sm:block hidden'>Log out</p>
    </Button>
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

export default LogOut