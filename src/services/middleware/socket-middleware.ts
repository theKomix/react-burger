import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "../store";

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<{ url: string, token: string }>,
  connecting: ActionCreatorWithoutPayload,
  disconnect: ActionCreatorWithoutPayload,
  connected: ActionCreatorWithoutPayload,
  close: ActionCreatorWithoutPayload,
  error: ActionCreatorWithPayload<string>,
  message: ActionCreatorWithPayload<string>
}

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null;
    let url = "";
    let token = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return next => action => {
      const { dispatch } = store;
      const {
        connect, connecting, disconnect, connected, error, close, message
      } = wsActions;

      if (connect.match(action)) {
        console.log("Websocket connect");
        url = action.payload.url;
        token = action.payload.token;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
        dispatch(connecting());
      }

      if (socket) {
        socket.onopen = () => {
          console.log("Websocket connected");
          dispatch(connected());
        };

        socket.onerror = (err) => {
          dispatch(error("Websocket error: " + err));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          // const parsedData = JSON.parse(data);
          dispatch(message(data));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log(event.reason);
            dispatch(error(event.reason));
          }

          if (isConnected) {
            dispatch(connecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect({ url, token }));
            }, 3000)
          }
        };

        if (disconnect.match(action)) {
          console.log("Websocket disconnect");
          window.clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          dispatch(close());
          if ( socket ) {
            socket.close();
          }
        }
      }

      next(action);
    }
  }
}