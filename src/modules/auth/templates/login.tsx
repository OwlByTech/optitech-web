"use client"
import { Input } from '@/modules/common/components/input'
import { signIn, useSession } from "next-auth/react";
import { SubmitButton } from '@/modules/common/components/submit-button';
import { InputPassword } from '@/modules/common/components/input-password';
import { useRouter } from 'next/navigation';
import { Button } from '@/modules/common/components/button';

export default function Login() {
    const session = useSession()
    const user = session.data?.user
    const route = useRouter()
    if (session.status === 'authenticated') {
        route.push("/")
    }

    console.log(session)
    return (
        <>
            {session.status === 'unauthenticated' &&
                <div className='w-screen h-screen flex flex-col items-center justify-center'>
                    <form className=' flex flex-col  gap-4 min-w-80 '>
                        <Input label='Correo' name="email" required type='email' />
                        <InputPassword label='Contrasena' name="password" required />
                        <Button onClick={async () => {
                            await new Promise((resolve) => { setTimeout(resolve, 3000) })
                            try {
                                const response = await signIn('credentials', {
                                    email: "demo@demo.com",
                                    password: "demo",
                                    redirect: false,
                                    callbackUrl: '/'
                                })
                                console.log(response)
                            } catch (e) {
                                console.log(e)


                            }

                        }}>Aceptar</Button>

                    </form>
                </div>
            }
        </>
    )
}



