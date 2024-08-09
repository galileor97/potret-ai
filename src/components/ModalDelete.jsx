import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import api from "../helper/api";

export default function ModalDelete({ id, getAllImage }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('blur')


    const handleDelete = async () => {

        try {
            // console.log(id);
            await api.delete(`/images/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            getAllImage()
            onClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button
                    radius="full"
                    variant="shadow"
                    color="danger"
                    onPress={onOpen}
                    className="capitalize"
                >
                    Delete
                </Button>
            </div>
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 ">Delete Potraits</ModalHeader>
                            <ModalBody>
                                <p className="text-wrap">
                                    Are you sure you want to delete this image?<br /> Once deleted, it will be permanently removed from your account.
                                </p>
                                <p className="text-red-600">
                                    This action cannot be undone.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
