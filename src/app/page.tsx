import { auth } from "@/auth";
import Principal from "@/modules/auth/templates/principal";

export const metadata = {
  title: "OptiTech",
};

export default async function Page() {
    const session = await auth();

  return <Principal isLoggedIn={!!session?.user}/>;
}

