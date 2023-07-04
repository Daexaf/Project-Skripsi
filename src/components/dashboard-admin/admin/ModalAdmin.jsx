import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAdmin({ setOpenModal, deleteData, id_admins }) {
  console.log(id_admins);
  return (
    <>
      <div
        className="modal show h-screen"
        style={{ display: "block", position: "absolute", overflow: "hidden" }}
      >
        <Modal.Dialog>
          <Modal.Header
            closeButton
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <Modal.Title>Hapus Item</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>apakah anda yakin ingin menghapus item ini?.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deleteData(id_admins);
              }}
            >
              Hapus
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}

export default ModalAdmin;
