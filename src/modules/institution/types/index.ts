export type Institution = {
    id?: number
    name?: string
    description?: string
    logo?: File
    services?: number[]
    clients?: number[]
}

export type Service = {
    id?: number
    name?: string
}
export type InstitutionContextType = {
    institution: Institution | null
    setInstitution: (instituton: Institution) => void
}

export enum ROUTES_INSTITUTION {
    REGISTER_INSTITUTION = "/register-institution",
    REGISTER_INSTITUTION_SERVICES = "/register-institution/services",
    REGISTER_INSTITUTION_LOGO = "/register-institution/logo",
}

