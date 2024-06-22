export type Auth = {
    email: string
    password: string
}


export enum ROUTES_AUTH {
    LOGIN = "/login",
    SING_UP = "/signUp",
    PRINCIPAL = "/principal",
    HOME = "/home",
    RESET_PASSWORD = "/reset-password",
    CHANGE_PASSWORD = "/change-password"
}

export type StateChangePasword = {
    errors?: {
        password?: string[];
        passwordReply?: string[];
    };
    message?: string | null;
};
export type StateResetPassword = {
    errors?: {
        email?: string[];
    };
    message?: string | null;
};

