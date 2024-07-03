import { auth } from "@/auth";

interface ApiGetOptions {
    type?: string;
    params?: { [key: string]: string };
}

type ApiResponse = any; 

export async function apiGet(endpoint: string, options: ApiGetOptions = {}): Promise<ApiResponse | null> {
    const session = await auth();
    const { type = "application/json", params = {} } = options;

    try {
        const url = new URL(`${process.env.API_URL}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url.toString(), {
            headers: {
                "Content-Type": type,
                "Authorization": `Bearer ${session?.user.token}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`GET request failed: ${response.statusText}`);
            return null;
        }
    } catch (e) {
        console.error('GET request error:', e);
        return null;
    }
}

export async function clientInfoService(): Promise<ApiResponse | null> {
    return await apiGet('/client');
}
