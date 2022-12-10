import * as React from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { ModalHeader } from "./modal-header/modal-header";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-burger-modal")!;

export const Modal: React.FC<{onClose: () => void, header: string, children: React.ReactNode}> = ( {onClose, header, children} ) => {

    const escFunction = React.useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape"){
            onClose();
        }
    }, [onClose]);

    React.useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [escFunction]);

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} pt-10 pl-10 pr-10 pb-15 `}>
                <ModalHeader onClose={onClose}>{header}</ModalHeader>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        modalRoot
    );
};
