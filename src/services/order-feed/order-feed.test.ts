import reducer, {
    initialState,
    connect,
    connecting,
    disconnect,
    connected,
    close,
    error,
    message,
    WebsocketStatus
} from "./order-feed-slice";
import {OrderList} from "../../models/order-list";

describe('order feed tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(
            initialState
        );
    });

    it("connect", () => {
        expect(reducer({
            orderList: {orders: [], total: 0, totalToday: 0},
            status: WebsocketStatus.OFFLINE,
            connectionError: "ERROR"
        }, connect({url: "", token: ""}))).toEqual(
            {orderList: {orders: [], total: 0, totalToday: 0}, status: WebsocketStatus.CONNECTING, connectionError: ""}
        );
    });

    it("connecting", () => {
        expect(reducer({
            orderList: {orders: [], total: 0, totalToday: 0},
            status: WebsocketStatus.OFFLINE,
            connectionError: ""
        }, connecting())).toEqual(
            {orderList: {orders: [], total: 0, totalToday: 0}, status: WebsocketStatus.CONNECTING, connectionError: ""}
        );
    });

    it("disconnect", () => {
        expect(reducer({
            orderList: {orders: [], total: 0, totalToday: 0},
            status: WebsocketStatus.ONLINE,
            connectionError: ""
        }, disconnect())).toEqual(
            {orderList: {orders: [], total: 0, totalToday: 0}, status: WebsocketStatus.OFFLINE, connectionError: ""}
        );
    });

    it("connected", () => {
        expect(reducer({
            orderList: {orders: [], total: 0, totalToday: 0},
            status: WebsocketStatus.CONNECTING,
            connectionError: ""
        }, connected())).toEqual(
            {orderList: {orders: [], total: 0, totalToday: 0}, status: WebsocketStatus.ONLINE, connectionError: ""}
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
                    }], total: 1, totalToday: 1
                }, status: WebsocketStatus.ONLINE, connectionError: ""
            },
            close()))
            .toEqual({
                    orderList: {orders: [], total: 0, totalToday: 0},
                    status: WebsocketStatus.OFFLINE,
                    connectionError: ""
                }
            );
    });

    it("error", () => {
        expect(reducer({
            orderList: {orders: [], total: 0, totalToday: 0},
            status: WebsocketStatus.ONLINE,
            connectionError: ""
        }, error("ERROR"))).toEqual(
            {
                orderList: {orders: [], total: 0, totalToday: 0},
                status: WebsocketStatus.OFFLINE,
                connectionError: "ERROR"
            }
        );
    });

    const orderList: OrderList = {
        success: true, message: "",
        orders: [
            {_id: "1", name: "", status: "done", number: 1, ingredients: [], createdAt: "1", updateAt: ""},
            {_id: "2", name: "", status: "done", number: 2, ingredients: [], createdAt: "2", updateAt: ""}
        ], total: 1, totalToday: 1
    };

    it("message", () => {
        expect(reducer({
                orderList: {orders: [], total: 0, totalToday: 0},
                status: WebsocketStatus.ONLINE,
                connectionError: ""
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
                status: WebsocketStatus.ONLINE, connectionError: ""
            }
        );
    });
})