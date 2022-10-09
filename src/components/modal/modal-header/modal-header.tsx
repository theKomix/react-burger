import * as React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal-header.module.css";

export const ModalHeader: React.FC<{onClose: () => void, children: React.ReactNode}> = ( {onClose, children} ) => {
    return (
        <div className={styles.header}>
            <div className="text text_type_main-large">{children}</div>
            <CloseIcon onClick={onClose} type="primary" />
        </div>);
};