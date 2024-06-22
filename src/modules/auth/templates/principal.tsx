import Link from "next/link";
import { ROUTES_AUTH } from "../types/auth";
import { SignOut } from "../components/sign-out";

export type PrincipalProps = {
  // TODO: Add type to clientInfo
  clientInfo: any;
};

export default function Principal(props: PrincipalProps) {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col justify-center p-10 rounded-3xl gap-3 border border-black h-60 w-64">
        <div className="flex flex-col">
          <h1 className="text-2xl">OptiTech</h1>
          <p>Bienvenido de nuevo</p>
        </div>
        {
          props.clientInfo ?
          <>
          <div className="flex flex-col font-bold justify-center">
                <p>
                    {props.clientInfo.GivenName}
                </p>
                <p>
                    {props.clientInfo.Id}
                </p>
                <p>
                    {props.clientInfo.Surname}
                </p>
                <p>
                    {props.clientInfo.Email}
                </p>
            </div>
           <SignOut />
          </>
           
            :
            <div className="flex  justify-between">
              <Link
                href="/login"
                className="bg-black text-white p-1 border border-black rounded-md hover:bg-white hover:text-black text-xs"
              >
                Iniciar sesión
              </Link>
              <Link
                href={ROUTES_AUTH.SING_UP}
                className="p-1 border border-black rounded-md hover:bg-black hover:text-white text-xs"
              >
                Registrarse
              </Link>
            </div>
        }

      </div>
    </section>
  );
}
