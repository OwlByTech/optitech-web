import { Card as CardNext, CardBody } from "@nextui-org/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export type ButtonCardProps = {
    title: string;
    icon: ReactNode;
    description: string;
    onClick?: () => void;
    active?: boolean;
};

export function ButtonCard(props: ButtonCardProps) {
    return (
        <CardNext onClick={props.onClick}
            className={`p-2 ${props.active && 'border border-black'}`}
            isPressable>
            <CardBody className="flex items-center flex-col gap-2">
                {props.icon}
                <h1 className="font-bold">{props.title}</h1>
                <span>{props.description}</span>
            </CardBody>
        </CardNext>
    );
}
