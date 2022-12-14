import {AuthUpdateTokenUrl} from "./api-urls";

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err.message));
}

export const saveTokens = (refreshToken: string, accessToken: string) => {
    setCookie("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const deleteTokens = () => {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
}

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}

export const getAccessToken = () => {
    return getCookie("accessToken") || "";
}

export const refreshTokenRequest = () => {
    return fetch(AuthUpdateTokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            token: getRefreshToken()
        })
    })
        .then(checkResponse)
}

export const fetchWithRefresh = async(url: RequestInfo | URL, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err === "jwt expired") {
            const {refreshToken, accessToken} = await refreshTokenRequest();
            saveTokens(refreshToken, accessToken);
            const headers = options?.headers ? new Headers(options.headers) : new Headers();
            headers.set("Authorization", accessToken);
            options.headers = headers;
            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | number | boolean, props: any = null) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    let propName: keyof typeof props;
    for (propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function deleteCookie(name: string) {
    setCookie(name, "", { expires: -1 });
}

export function getBeautyDate(date: Date) {
    const now = new Date();
    const time = `${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    const diff = Math.abs(new Date(now.toDateString()).getTime() - new Date(date.toDateString()).getTime());
    const daysDiff = Math.floor(diff / (1000 * 3600 * 24));
    if (daysDiff === 0) {
        return `Сегодня, ${time}`;
    }
    if (daysDiff === 1) {
        return `Вчера, ${time}`;
    }
    if (daysDiff < 5) {
        return `${daysDiff} дня назад, ${time}`;
    }
    if (daysDiff <= 7) {
        return `${daysDiff} дней назад, ${time}`;
    }
    return `${date.toLocaleDateString()}, ${time}`;
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as Record<K, T[]>);
