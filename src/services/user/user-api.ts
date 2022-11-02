import {RegisterUserUrl, ResetPasswordUrl, StartResetPasswordUrl} from "../api-urls";

export async function RegisterUser(name: string, email: string, password: string): Promise<boolean> {
    return fetch(RegisterUserUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<{ success: boolean; message: string }>
    }).then(
        data => data.success)
}

export async function StartResetPassword(email: string): Promise<boolean> {
    return fetch(StartResetPasswordUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email
            })
        }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<{ success: boolean; message: string }>
    }).then(
        data => data.success)
}

export async function ResetPassword(newPassword: string, token: string): Promise<boolean> {
    return fetch(ResetPasswordUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                password: newPassword,
                token: token
            })
        }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<{ success: boolean; message: string }>
    }).then(
        data => data.success)
}