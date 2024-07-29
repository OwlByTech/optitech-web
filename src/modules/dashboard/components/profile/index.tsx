import { ClientInfoRes } from "../../types";
type ProfileProps = {
    clientInfo: ClientInfoRes
}
export async function Profile(props: ProfileProps) {
    const rol = props.clientInfo?.roles[0]?.roleName
    return (
        <div className=" flex flex-row gap-2 ">
            <img
                className="bg-white md:bg-gray-200 text-xs  text-black h-12 w-12 "
                src={props.clientInfo.photo !== "" ? props.clientInfo.photo : "/profile.png"}
            />
            <div className=" flex flex-col justify-end ">
                <span className="text-sm">{`${props.clientInfo?.givenName} ${props.clientInfo?.surname}`}</span>
                <span className="text-gray-500 text-xs font-bold">{rol[0].toLocaleUpperCase()}{rol.slice(1)}</span>
            </div>

        </div>
    );
}
