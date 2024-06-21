
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
