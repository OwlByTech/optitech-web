import { auth } from "@/auth";
import { Institution } from "../types";

export async function getServicesInstitution() {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/services`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}

export async function getInstitutionService() {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/institution`, {
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}
export async function createInstitutionService(institution: Institution): Promise<Institution | null> {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/institution`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            },
            body: JSON.stringify(institution)
        });
        if (response.status === 401) {
            return null
        }
        const data = await response.json()
        const resposeLogo = await updateLogoInstitutionService(data.id, institution.logo as File)

        if (!resposeLogo) {
            return null
        }
        return data


    } catch (e) {
        return null;
    }
}
export async function updateLogoInstitutionService(id: number, logo: File): Promise<boolean | null> {
    const session = await auth();
    const formData = new FormData()
    formData.append("logo", logo)
    try {
        const response = await fetch(`${process.env.API_URL}/institution/logo/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            },
            body: formData
        });
        console.log(response)
        if (response.status === 401) {
            return null
        }

        const data = await response.json();
        return data
    } catch (e) {
        return null;
    }
}

