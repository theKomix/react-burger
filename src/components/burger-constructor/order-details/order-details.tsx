import * as React from "react";
import {Modal} from "../../modal/modal";import styles from "./order-details.module.css";
import done from '../../../images/done.png';
import loading from '../../../images/loading.gif';
import error from '../../../images/error.png';
import {useAppSelector} from "../../../hooks";
import {selectOrder} from "../../../services/order/order-slice";

export const OrderDetails: React.FC<{
    show: boolean;
    onClose: () => void
}> = ( {show, onClose} ) => {
    const orderState = useAppSelector(selectOrder);

    const orderText = () => {
        return orderState.status === 'idle'
            ? <>
                <span className="text text_type_digits-large pb-8">{orderState.number}</span>
                <span className="text text_type_main-medium">идентификатор заказа</span>
            </>
            : <span className="text text_type_main-medium" style={{textAlign: 'center'}}>{orderState.error}</span>
    };

    const orderStatus = () => {
        switch (orderState.status) {
            case 'idle':
                return done;
            case 'failed':
                return error;
        }
        return loading;
    };

    return (
        <div style={{overflow: 'hidden'}}>
            {show &&
                <Modal header="" onClose={onClose}>
                    <div className={`${styles.content} pt-10 pb-15`}>
                        {orderText()}
                        <img className={`${styles.done} mt-15 mb-15`} src={orderStatus()} alt="done"/>
                        {orderState.status === 'idle' && <>
                            <span className="text text_type_main-small">Ваш заказ начали готовить</span>
                            <span className="text text_type_main-small text_color_inactive">Дожитесь готовности на орбитальной станции</span>
                        </>}
                    </div>
                </Modal>
            }
        </div>
    );
};