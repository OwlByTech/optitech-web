import { auth } from "@/auth";
import { ClientInfoRes } from "../types";

export async function clientInfoService(): Promise<ClientInfoRes | null> {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}/client`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    if (!response.ok) {
      console.error("Login failed:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (e) {
    console.error("Login error:", e);
    return null;
  }
}
