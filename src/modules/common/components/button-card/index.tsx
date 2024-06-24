import { Card as CardNext, CardBody } from "@nextui-org/react";
import { FiGlobe, FiPackage } from "react-icons/fi";

export function ButtonCard({
    className,
    title,
    icon,
    description,
}: CardProps) {
    return (
        <CardNext className="bg-gray m-5" isPressable>
            <CardBody>
                 {icon ? <FiGlobe /> : <FiPackage />}
                <h1 className="font-bold">{title}</h1>
                <span>{description}</span>
            </CardBody>
        </CardNext>
    );
}
