import { auth } from "@/auth";
import { User } from "../types";

interface ApiGetOptions {
  type?: string;
  params?: { [key: string]: string };
}

type ApiResponse = any;

export async function apiGet(
  endpoint: string,
  options: ApiGetOptions = {}
): Promise<ApiResponse | null> {
  const session = await auth();
  const { type = "application/json", params = {} } = options;

  try {
    const url = new URL(`${process.env.API_URL}${endpoint}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`GET request failed: ${response.statusText}`);
      return null;
    }
  } catch (e) {
    console.error("GET request error:", e);
    return null;
  }
}

export async function clientInfoService(): Promise<ApiResponse | null> {
  return await apiGet("/client");
}

export async function updateUserInfo(user: User) {
  try {
    const response = await fetch(`${process.env.API_URL}/client/update/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update user info");
    }
  } catch (e) {
    console.error("Login error:", e);
    return null;
  }
}
