'use client';
import {SignOut} from '@/modules/auth/components/sign-out';
import Link from 'next/link';

export default function Step3() {
  return (
    <section className="flex flex-col items-center justify-center h-screen mx-5 gap-[50px] sm:mx-96">
      <div className="sm:w-full">
        <h1 className="font-extrabold text-lg sm:text-3xl">Paso 3: Activa tu cuenta</h1>
        <p className="text-sm sm:text-xl">
          Para activar tu cuenta, debes escribirnos a los siguientes sitios.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Link
          href="mailto:support@owlbytech.com"
          className="text-xs text-center font-bold bg-black text-white p-3 border border-black rounded-xl hover:bg-white hover:text-black"
        >
          Correo Electronico
        </Link>
        <Link
          href="https://wa.me/573213214390"
          className="text-xs text-center font-bold bg-black text-white p-3 border border-black rounded-xl hover:bg-white hover:text-black"
        >
          WhatsApp
        </Link>

        <SignOut className="text-xs text-center font-bold bg-black text-white p-3 border border-black rounded-xl hover:bg-white hover:text-black w-full" />
      </div>
    </section>
  );
}
