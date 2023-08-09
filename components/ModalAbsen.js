import { Modal } from "antd";

export default function ModalAbsen({ modalOpen, setModalOpen }) {
    return (
        <Modal
            title="20px to Top"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    )
}
