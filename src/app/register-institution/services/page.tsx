import { getServicesInstitution } from "@/modules/institution/services";
import AddServices from "@/modules/institution/templates/add-services";

export default async function Page() {
    const services = await getServicesInstitution()
    console.log(services)
    return <AddServices servicesData={services} />;
}
