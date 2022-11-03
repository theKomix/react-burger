import {
    AuthLoginUrl,
    AuthLogoutUserUrl,
    AuthRegisterUserUrl,
    AuthUserUrl,
    ResetPasswordUrl,
    StartResetPasswordUrl
} from "../api-urls";
import {checkResponse, fetchWithRefresh, getCookie, getRefreshToken} from "../utils";

interface AuthUserResponse{
    success: boolean,
    user: {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}

interface AuthGetUserResponse{
    success: boolean,
    user: {
        email: string,
        name: string
    }
}

export async function AuthRegisterUser(name: string, email: string, password: string): Promise<AuthUserResponse> {
    return fetch(AuthRegisterUserUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        })
        .then(checkResponse)
        .then(data => data as Promise<AuthUserResponse>)
}

export async function AuthLoginUser(email: string, password: string): Promise<AuthUserResponse> {
    return fetch(AuthLoginUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                password,
                email
            })
        })
        .then(checkResponse)
        .then(data => data as Promise<AuthUserResponse>)
}

export async function AuthLogoutUser(): Promise<AuthUserResponse> {
    return fetch(AuthLogoutUserUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                token: getRefreshToken()
            })
        })
        .then(checkResponse)
        .then(data => data as Promise<AuthUserResponse>)
}

export async function AuthGetUser(): Promise<AuthGetUserResponse> {
    return fetchWithRefresh(AuthUserUrl, {headers: {"Authorization": `${getCookie("accessToken")}`}})
        .then(data => data as Promise<AuthGetUserResponse>)
}

export async function StartResetPassword(email: string): Promise<boolean> {
    return fetch(StartResetPasswordUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email
            })
        })
        .then(checkResponse)
        .then(data => data.success)
}

export async function ResetPassword(newPassword: string, token: string): Promise<boolean> {
    return fetch(ResetPasswordUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                password: newPassword,
                token: token
            })
        })
        .then(checkResponse)
        .then(data => data.success)
}
