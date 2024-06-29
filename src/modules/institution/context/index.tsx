"use client"
import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { Institution, InstitutionContextType } from '../types'

const initialInstitutionContext: InstitutionContextType = {
    institution: null,
    setInstitution: () => { }
}

const InstitutionContext = createContext<InstitutionContextType>(initialInstitutionContext)

const InstitutionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [institution, setInstitution] = useState<Institution | null>(JSON.parse(localStorage.getItem("institution")) as Institution)

    useEffect(() => {
        const data = localStorage.getItem("institution")
        console.log("data 1", data)
        localStorage.setItem("institution", JSON.stringify({ ...institution, logo: null }))
    }, [institution])
    return <InstitutionContext.Provider value={{ institution, setInstitution }}>{children}</InstitutionContext.Provider>
}

export { InstitutionContext, InstitutionProvider }
