"use client"
import { Input } from '@/modules/common/components/input'
import { signIn, useSession } from "next-auth/react";
import { useFormState } from 'react-dom';
import { loginUser } from '../actions';
import { SubmitButton } from '@/modules/common/components/submit-button';
import { InputPassword } from '@/modules/common/components/input-password';
import { useRouter } from 'next/navigation';

export default function Login() {
    const session = useSession()
    const user = session.data?.user
    const [result, formAction] = useFormState(loginUser, { state: false })
    const route = useRouter()
    if (session.status === 'authenticated') {
        route.push("/")
    }

    console.log(session)
    return (
        <>
            {session.status === 'unauthenticated' &&
                <div className='w-screen h-screen flex flex-col items-center justify-center'>
                    <form onSubmit={async (formData) => {
                        await new Promise((resolve) => { setTimeout(resolve, 3000) })
                        try {
                            const response = await signIn("credentials", { email: "demo@demo.com", password: "demo" });
                        } catch (e) {
                            console.log(e)


                        }
                    }} className=' flex flex-col  gap-4 min-w-80 '>
                        <Input label='Correo' name="email" required type='email' />
                        <InputPassword label='Contrasena' name="password" required />
                        <SubmitButton >Aceptar</SubmitButton>
                    </form>
                </div>
            }
        </>
    )
}



