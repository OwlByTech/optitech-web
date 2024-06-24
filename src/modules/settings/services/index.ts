import { auth } from "@/auth";

export async function clientInfoService() {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.API_URL}/client`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        if (response.ok) {
            // TODO: add types to the client Info service
            return await response.json();
        } else {
            console.error('Login failed:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Login error:', e);
        return null;
    }
}