import { auth } from "@/auth";



export async function getDirectoryService(id: number) {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/directory/${id}`, {
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}
