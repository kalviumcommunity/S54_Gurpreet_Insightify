import { useDisclosure } from "@chakra-ui/react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, } from "@chakra-ui/react";
import { SignIn } from "@clerk/clerk-react";

function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} style={{ width:"7.7vmax", color:"white", fontSize:"1.2vmax", backgroundColor:"black", padding:"0.5vmax", outline:"none", borderRadius:"10px", border:"none" }}>Sign In</Button>
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'lg'} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader >Log In / Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody style={{ padding:"auto"}}>
            <SignIn path="/sign-in" />
            </ModalBody>
  
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default BasicUsage;