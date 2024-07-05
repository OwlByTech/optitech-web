export type Auth = {
    email: string
    password: string
}

export enum StatusClient {
    ACTIVE = "activo",
    INACTIVE = "inactivo"
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

declare module "next-auth" {
    interface Session {
        user: {
            token: string;
        }
    }
    interface User {
        token: string;

    }
}
