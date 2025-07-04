import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteApplicationModal = ({
  openModal,
  deleteId,
  deleteIndex,
  handleCloseModal,
  handleDelete,
  handleCancelDelete,
}) => {
  return (
    <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this application?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="red"
              onClick={() => handleDelete(deleteId, deleteIndex)}
            >
              Yes, I'm sure
            </Button>
            <Button color="alternative" onClick={handleCancelDelete}>
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteApplicationModal;
