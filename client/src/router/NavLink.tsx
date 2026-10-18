"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "./routes";
import { ROUTES } from "./routes";

const isActiveRoute = (pathname: string | null, href: string): boolean =>
    pathname === href || (href !== ROUTES.HOME && (pathname ?? "").startsWith(`${href}/`));

// navigation link with active route highlighting
export default function NavLink({ item, className = "" }: { item: NavItem; className?: string }) {
    const pathname = usePathname();
    const active = isActiveRoute(pathname, item.href);

    return (
        <Link
            href={item.href}
            className={(active ? "text-primary" : "") + className}
            aria-current={active ? "page" : undefined}
        >
            {item.label}
        </Link>
    );
}
