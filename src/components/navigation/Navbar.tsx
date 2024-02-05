import type { VNode } from "preact";
import { useEffect, useState } from "preact/hooks";

import { appConfig } from "@/config/app";
import { cn } from "@/utils/cn";

type NavbarProps = {
  initialPathname?: string;
};

const Navbar = ({ initialPathname }: NavbarProps) => {
  const [pathname, setPathname] = useState(initialPathname);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const NavLink = ({
    href,
    noUnderline = false,
    children,
  }: {
    href: string;
    noUnderline?: boolean;
    children: preact.VNode | string;
  }) => {
    return (
      <a
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={cn(
          "border-b-2 border-transparent transition-colors duration-500",
          !noUnderline &&
            (pathname === href ? "border-white" : "hover:border-white"),
        )}
      >
        {children}
      </a>
    );
  };

  return (
    <nav className="fixed inset-x-0 z-[1] flex justify-between bg-neutral-950 bg-opacity-80 px-4 py-3">
      <NavLink href="/" noUnderline>
        {appConfig.branding.name}
      </NavLink>
      <div className="flex justify-between gap-5">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/shuffler">Shuffler</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
