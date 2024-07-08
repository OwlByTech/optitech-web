export type Directory = {
    id: number
    name: string
    file?: string
    child?: Directory[]
}

export const directory: Directory[] = [
    {
        id: 1,
        name: "Documentos",
        child: [
            {
                id: 2,
                name: "Recursos humanos",
                child: [
                    {
                        id: 1,
                        name: "Documentos",
                        child: [
                            {
                                id: 2,
                                name: "Recursos humanos",
                                child: [
                                    {
                                        id: 1,
                                        name: "Documentos",
                                        child: [
                                            {
                                                id: 2,
                                                name: "Recursos humanos",
                                                child: [
                                                    {
                                                        id: 1,
                                                        name: "Documentos",
                                                        child: [
                                                            {
                                                                id: 2,
                                                                name: "Recursos humanos",
                                                                child: [
                                                                    {
                                                                        id: 3,
                                                                        name: "maria",
                                                                        file: "maria.pdf"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 3,
                                                        name: "maria",
                                                        file: "maria.pdf"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 3,
                                        name: "maria",
                                        file: "maria.pdf"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "maria",
                        file: "maria.pdf"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Documentos",
        child: [
            {
                id: 2,
                name: "Recursos humanos",
                child: [
                    {
                        id: 3,
                        name: "maria",
                        file: "maria.pdf"
                    }
                ]
            }
        ]
    }

]
