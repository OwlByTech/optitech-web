export async function resetPasswordService(email: string): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.API_URL}/client/reset-password`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email })

            })
        return await response.json()

    } catch (e) {
        return false
    }
}

export async function loginService(email: string, password: string): Promise<{ token: string } | null> {
    try {
        const response = await fetch(`${process.env.API_URL}/client/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const data = await response.json();
            return data.token
        } else {
            console.error('Login failed:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Login error:', e);
        return null;
    }
}

export async function changePasswordService(token: string, password: string): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.API_URL}/client/reset-password-token`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token, password: password })

            })
        return await response.json()
    } catch (e) {
        return false
    }
}


export async function validateTokenPasswordResetService(token: string): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.API_URL}/client/validate/reset-password-token/?token=${token}`)
        return await response.json()
    } catch (e) {
        return false
    }
}
