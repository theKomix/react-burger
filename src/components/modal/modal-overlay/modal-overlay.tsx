import * as React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";

const modalOverlayRoot = document.getElementById("react-burger-modal-overlay")!;

export const ModalOverlay: React.FC<{onClose: () => void}> = ( { onClose } ) => {
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}/>,
        modalOverlayRoot
    );
};