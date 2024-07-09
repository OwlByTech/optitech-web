export type Directory = {
    id?: number
    name?: string
    parentId?: number
    document?: File[]
    directory?: Directory[]
}

export type File = {
    id: number
    name: string
}


