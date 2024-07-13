import { auth } from "@/auth";

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${process.env.API_URL}${path}`);
    return await response.json();
  } catch (e) {
    return null;
  }
}

export async function apiPost<T>(path: string, body: {}): Promise<T | null> {
  try {
    const response = await fetch(`${process.env.API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error("Response failed");
      return null;
    }
    return await response.json();
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function apiSecureGet<T>(path: string): Promise<T | null> {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function apiSecurePost<T>(
  path: string,
  body: {}
): Promise<T | null> {
  return await apiSecureMethod<T>(path, body, "POST");
}

export async function apiSecurePut<T>(
  path: string,
  body: {}
): Promise<T | null> {
  return await apiSecureMethod<T>(path, body, "PUT");
}

async function apiSecureMethod<T>(
  path: string,
  body: {},
  method: "PUT" | "POST"
): Promise<T | null> {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error("Response failed");
      return null;
    }
    return await response.json();
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}
