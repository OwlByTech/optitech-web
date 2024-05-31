"use client"
import { useFormState } from 'react-dom';
import { authenticate } from '../services/actions';
import { Input } from '../../common/components/input';
import { InputPassword } from '../../common/components/input-password';
import { SubmitButton } from '../../common/components/submit-button';

export default function Login() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center justify-center'>
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



