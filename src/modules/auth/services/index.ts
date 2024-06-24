
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
        console.log(e)
        return false

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
