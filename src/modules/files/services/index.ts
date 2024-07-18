import { auth } from "@/auth";
export async function getDirectoryService(id?: number) {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/directory-tree/parent/${id}`, {
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}

export async function getDirectoryChildService(id?: number) {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/directory-tree/child/${id}`, {
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}

export async function getDirectoryRouteService(id?: number) {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/directory-tree/route/${id}`, {
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}
