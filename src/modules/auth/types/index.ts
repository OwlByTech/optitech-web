
export enum StatusClient {
    INACTIVE = "inactivo",
    ACTIVE = "inactivo"
}

export type Auth = {
    email: string
    password: string
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

export type StateRegister = {
    errors?: {} | null;
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

export enum ROLES {
    ASSESOR = 'asesor',
    INSTITUTION = 'institución'
};
