export type Auth = {
    email: string
    password: string
}


export enum ROUTES_AUTH {
    LOGIN = "/login",
    SING_UP = "/sign-up",
    DASHBOARD = "/dashboard",
    RESET_PASSWORD = "/reset-password"
}
