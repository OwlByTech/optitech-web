export type Auth = {
    email: string
    password: string
}


export enum ROUTES_AUTH {
    LOGIN = "/login",
    SING_UP = "/signUp",
    PRINCIPAL = "/principal",
    HOME = "/home"
}
