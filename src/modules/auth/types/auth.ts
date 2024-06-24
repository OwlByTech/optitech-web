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
    STEP1 = "/signUp/stepOne",
    STEP2 = "/signUp/stepTwo",
    STEP3 = "/signUp/stepThree",
}
