import { RequestInit } from "next/dist/server/web/spec-extension/request";

async function fetchClient(data: RequestInit | undefined) {
    try {
        const response = await fetch(process.env.API_URL, data)
        return await response.json()
    } catch (error) {

    }

}
