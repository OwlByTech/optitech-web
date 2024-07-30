import { getInstitutionService, getLogoInstitutionService } from "@/modules/institution/services"
import InformationInstitution from "@/modules/institution/templates/information"

export default async function Page() {
    const institution = await getInstitutionService()

    if (!institution) {
        return <>No found</>
    }

    if (institution.logo != "") {
        const logo = await getLogoInstitutionService(institution.id)
        if (logo)
            institution.logo = logo
    }


    return <InformationInstitution institution={institution} />

}
