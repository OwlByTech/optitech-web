import { CgProfile } from "react-icons/cg";
import { clientInfoService } from "../..";

export async function Profile() {

    const clientInfo = await clientInfoService();
    return <div className=" flex flex-row gap-2 ">
        <img className="bg-white md:bg-gray-200 text-xs  text-black h-12 w-12 " src="/profile.png" />
        <div className=" flex flex-col justify-end text-xs">
            <span>
                {`${clientInfo.GivenName} ${clientInfo.Surname}`}
            </span>
            <span>
                {clientInfo.Email}
            </span>

        </div>
    </div>
}
