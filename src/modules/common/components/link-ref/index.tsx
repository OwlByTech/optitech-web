import Link from "next/link";

type Props = {
    children?: React.ReactNode
    href: string
    className?: string
    onClick?: () => void
    passHref?: true

}

export function LinkRef({
    children, href, ...props
}: Props
) {
    return (
        <Link href={href} passHref  {...props}>
            {children}
        </Link>
    );
}
