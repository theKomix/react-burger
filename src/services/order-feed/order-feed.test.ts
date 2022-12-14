import reducer, {
    initialState,
    connect,
    connecting,
    disconnect,
    connected,
    close,
    error,
    message,
    WebsocketStatus, OrderFeedState
} from "./order-feed-slice";
import {OrderList} from "../../models/order-list";

describe('order feed tests', () => {
    const testState: OrderFeedState = {
        orderList: {orders: [], total: 0, totalToday: 0},
        status: WebsocketStatus.OFFLINE,
        connectionError: ""
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(
            initialState
        );
    });

    it("connect", () => {
        expect(reducer({
            ...testState,
            connectionError: "ERROR"
        }, connect({url: "", token: ""}))).toEqual(
            {...testState, status: WebsocketStatus.CONNECTING}
        );
    });

    it("connecting", () => {
        expect(reducer({...testState}, connecting())).toEqual(
            {...testState, status: WebsocketStatus.CONNECTING}
        );
    });

    it("disconnect", () => {
        expect(reducer({
            ...testState,
            status: WebsocketStatus.ONLINE
        }, disconnect())).toEqual(
            {...testState}
        );
    });

    it("connected", () => {
        expect(reducer({
            ...testState,
            status: WebsocketStatus.CONNECTING
        }, connected())).toEqual(
            {...testState, status: WebsocketStatus.ONLINE}
        );
    });

    it("close", () => {
        expect(reducer({
                orderList: {
                    orders: [{
                        _id: "",
                        name: "",
                        status: "done",
                        number: 1,
                        ingredients: [],
                        createdAt: "",
                        updateAt: ""
                    }],
                    total: 1,
                    totalToday: 1
                },
                status: WebsocketStatus.ONLINE,
                connectionError: ""
            },
            close()))
            .toEqual({
                    ...testState
                }
            );
    });

    it("error", () => {
        expect(reducer({
            ...testState,
            status: WebsocketStatus.ONLINE
        }, error("ERROR"))).toEqual(
            {
                ...testState,
                connectionError: "ERROR"
            }
        );
    });

    const orderList: OrderList = {
        success: true,
        message: "",
        orders: [
            {_id: "1", name: "", status: "done", number: 1, ingredients: [], createdAt: "1", updateAt: ""},
            {_id: "2", name: "", status: "done", number: 2, ingredients: [], createdAt: "2", updateAt: ""}
        ],
        total: 1,
        totalToday: 1
    };

    it("message", () => {
        expect(reducer({
                ...testState,
                status: WebsocketStatus.ONLINE
            },
            message(JSON.stringify(orderList)))).toEqual(
            {
                orderList: {
                    ...orderList,
                    orders: [
                        orderList.orders[1],
                        orderList.orders[0]
                    ]
                },
                status: WebsocketStatus.ONLINE,
                connectionError: ""
            }
        );
    });
})