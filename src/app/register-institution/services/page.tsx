import { getServicesInstitution } from "@/modules/institution/services";
import AddServices from "@/modules/institution/templates/add-services";

export default async function Page() {
    const services = await getServicesInstitution()
    return <AddServices servicesData={services} />;
}
