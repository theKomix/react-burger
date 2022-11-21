const apiEndPoint = "https://norma.nomoreparties.space/api";

export const GetIngredientsUrl = `${apiEndPoint}/ingredients`;
export const PostOrderUrl = `${apiEndPoint}/orders`;

export const StartResetPasswordUrl = `${apiEndPoint}/password-reset`;
export const ResetPasswordUrl = `${apiEndPoint}/password-reset/reset`;

export const AuthRegisterUserUrl = `${apiEndPoint}/auth/register`;  // эндпоинт для регистрации пользователя
export const AuthLoginUrl = `${apiEndPoint}/auth/login`;            // эндпоинт для авторизации
export const AuthLogoutUserUrl = `${apiEndPoint}/auth/logout`;      // эндпоинт для выхода из системы
export const AuthUpdateTokenUrl = `${apiEndPoint}/auth/token`;      // эндпоинт обновления токена
export const AuthUserUrl = `${apiEndPoint}/auth/user`;              // эндпоинт получения и обновления данных о пользователе
