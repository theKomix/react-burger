import reducer, { UserState, initialState, getUserAsync, logoutUserAsync, loginUserAsync, registerUserAsync,
    updateRegistrationField } from "./user-slice";
import fetchMock from 'fetch-mock';
import {AuthLoginUrl, AuthLogoutUserUrl, AuthRegisterUserUrl, AuthUpdateTokenUrl, AuthUserUrl} from "../api-urls";
import {AuthGetUserResponse, AuthUserResponse} from "./user-api";
import {store} from "../store";
import {getAccessToken, getRefreshToken, saveTokens} from "../utils";

describe('user slice tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(
            initialState
        );
    });

    it("update registration field", () => {
        const previousState: UserState = {user: null, registration: {name: "Test", email: "test@test.ru", password: "Test"}, error: "", status: "idle"};

        expect(reducer(previousState, updateRegistrationField({fieldName: "name", fieldValue: "User"}))).toEqual(
            { ...previousState, registration: {...previousState.registration, name: "User"} }
        );

        expect(reducer(previousState, updateRegistrationField({fieldName: "email", fieldValue: "user@yandex.ru"}))).toEqual(
            { ...previousState, registration: {...previousState.registration, email: "user@yandex.ru"} }
        );

        expect(reducer(previousState, updateRegistrationField({fieldName: "password", fieldValue: "Aa123456"}))).toEqual(
            { ...previousState, registration: {...previousState.registration, password: "Aa123456"} }
        );
    });

    it("register user success", async () => {
        fetchMock.postOnce({
                name: "RegisterSuccess",
                url: AuthRegisterUserUrl,
                body: {
                    name: "User",
                    password: "Aa123456",
                    email: "user@yandex.ru"
                }
            },
            {
                success: true,
                user: {
                    name: "User",
                    email: "user@yandex.ru"
                },
                accessToken: "1",
                refreshToken: "2"
            } as AuthUserResponse
        );

        const result = await store.dispatch(registerUserAsync({name: "User", password: "Aa123456", email: "user@yandex.ru"} ));
        const authUser = result.payload as AuthUserResponse;

        expect(result.type).toBe("user/registerUser/fulfilled");
        expect(authUser.success).toEqual(true);

        const state = store.getState();
        expect(state.user.user).toEqual({ name: "User", email: "user@yandex.ru"});
        expect(state.user.error).toEqual("");
        expect(state.user.status).toEqual("idle");
    });

    it("login/logout user success", async () => {
        fetchMock.postOnce({
                name: "LoginUserAsync",
                url: AuthLoginUrl,
                body: {
                    password: "Aa123456",
                    email: "user@yandex.ru"
                }
            },
            {
                success: true,
                user: {
                    name: "User",
                    email: "user@yandex.ru"
                },
                accessToken: "1",
                refreshToken: "2"
            } as AuthUserResponse
        );
        fetchMock.postOnce({
                name: "LogoutUserAsync",
                url: AuthLogoutUserUrl,
                body: {
                    token: "2"
                }
            },
            {
                success: true
            } as AuthUserResponse
        );

        const login = await store.dispatch(loginUserAsync({password: "Aa123456", email: "user@yandex.ru"} ));
        const authUser = login.payload as AuthUserResponse;

        expect(login.type).toBe("user/loginUser/fulfilled");
        expect(authUser.success).toEqual(true);
        expect(getAccessToken()).toBe("1");
        expect(getRefreshToken()).toBe("2");
        let state = store.getState();
        expect(state.user.user).toEqual({ name: "User", email: "user@yandex.ru"});
        expect(state.user.error).toEqual("");
        expect(state.user.status).toEqual("idle");


        const logout = await store.dispatch(logoutUserAsync());
        const logoutAuthUser = logout.payload as AuthUserResponse;
        expect(getAccessToken()).toBe("");
        expect(getRefreshToken()).toBe(null);
        expect(logout.type).toBe("user/logoutUser/fulfilled");
        expect(logoutAuthUser.success).toEqual(true);
        state = store.getState();
        expect(state.user.user).toEqual(null);
        expect(state.user.error).toEqual("");
        expect(state.user.status).toEqual("idle");
    });

    it("get user success", async () => {
        saveTokens("2", "1");
        fetchMock.getOnce({
                name: "GetUserSuccess",
                url: AuthUserUrl,
                headers: {"Authorization": "1"}
            },
            {
                success: true,
                user: {
                    name: "User",
                    email: "user@yandex.ru"
                }
            } as AuthGetUserResponse
        );

        const result = await store.dispatch(getUserAsync());
        const authUser = result.payload as AuthGetUserResponse;

        expect(result.type).toBe("user/getUser/fulfilled");
        expect(authUser.success).toEqual(true);

        const state = store.getState();
        expect(state.user.user).toEqual({ name: "User", email: "user@yandex.ru"});
        expect(state.user.error).toEqual("");
        expect(state.user.status).toEqual("idle");
    });

    it("get user with refresh token success", async () => {
        saveTokens("2", "1");
        fetchMock.getOnce({
                name: "GetUserFailed",
                url: AuthUserUrl,
                headers: {"Authorization": "1"}
            },
            {
                throws: "jwt expired"
            }
        );

        fetchMock.postOnce({
                name: "RefreshTokenSuccess",
                url: AuthUpdateTokenUrl,
                body: {
                    token: "2"
                }
            },
            {
                refreshToken: "4",
                accessToken: "3"
            }
        );

        fetchMock.getOnce({
                name: "GetUserSuccess",
                url: AuthUserUrl,
                headers: {"Authorization": "3"}
            },
            {
                success: true,
                user: {
                    name: "User",
                    email: "user@yandex.ru"
                }
            } as AuthGetUserResponse,
            { overwriteRoutes: false }
        );

        const result = await store.dispatch(getUserAsync());
        const authUser = result.payload as AuthGetUserResponse;

        expect(result.type).toBe("user/getUser/fulfilled");
        expect(authUser.success).toEqual(true);

        const state = store.getState();
        expect(state.user.user).toEqual({ name: "User", email: "user@yandex.ru"});
        expect(state.user.error).toEqual("");
        expect(state.user.status).toEqual("idle");
    });
})