"use client"
import { useFormState } from 'react-dom';
import { authenticate } from '../services/actions';
import { Input } from '../../common/components/input';
import { InputPassword } from '../../common/components/input-password';
import { SubmitButton } from '../../common/components/submit-button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const route = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (pathname === '/')
            route.push("login")
    }, [pathname])
    return (
        <>
            <div className='flex flex-col items-center  justify-center w-screen h-screen  gap-6'>
                <h1 className=' font-bold text-xl' >Iniciar sesión</h1>
                <form action={dispatch} className=' flex flex-col  gap-4 min-w-80 '>
                    <Input label='Correo' name="email" required type='email' />
                    <InputPassword label='Contrasena' name="password" required />
                    {errorMessage && <p className='text-red-600 font-bold text-xs' >{errorMessage}</p>}
                    <SubmitButton>Aceptar</SubmitButton>
                </form>
            </div>
        </>
    )
}



