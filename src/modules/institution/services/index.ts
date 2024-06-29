import { auth } from "@/auth";

export async function getServicesInstitution() {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/services`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}
