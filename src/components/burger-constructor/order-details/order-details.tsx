import * as React from "react";
import {Modal} from "../../modal/modal";import styles from "./order-details.module.css";
import done from '../../../images/done.png';

export const OrderDetails: React.FC<{
    orderNumber: string;
    show: boolean;
    onClose: () => void
}> = ( {orderNumber, show, onClose} ) => {

    return (
        <div style={{overflow: 'hidden'}}>
            {show &&
                <Modal header="" onClose={onClose}>
                    <div className={`${styles.content} pt-10 pb-15`}>
                        <span className="text text_type_digits-large pb-8">{orderNumber}</span>
                        <span className="text text_type_main-medium">идентификатор заказа</span>
                        <img className={`${styles.done} mt-15 mb-15`} src={done} alt="done"/>
                        <span className="text text_type_main-small">Ваш заказ начали готовить</span>
                        <span className="text text_type_main-small text_color_inactive">Дожитесь готовности на орбитальной станции</span>
                    </div>
                </Modal>
            }
        </div>
    );
};