export type Auth = {
    email: string
    password: string
}

export enum ROUTES_AUTH {
    LOGIN = "/login",
    SING_UP = "/sign-up",
    DASHBOARD = "/dashboard",
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