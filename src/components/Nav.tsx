"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { AuthButton, MobileAuthButton } from "@/components/AuthButton";
import { useAuth } from "@/hooks/useAuth";

const publicNavItems = [
  {
    label: "Home",
    href: "/",
    isShow: true,
  },
  {
    label: "About",
    href: "/about",
    isShow: false,
  },
  {
    label: "Services",
    href: "/services",
    isShow: false,
  },
  {
    label: "Contact",
    href: "/contact",
    isShow: false,
  },
  {
    label: "Blog",
    href: "/blog",
    isShow: false,
  },
];

const authenticatedNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    isShow: true,
  },
  {
    label: "PDF Viewer",
    href: "/pdf-viewer",
    isShow: true,
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Nav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const isActive = (href: string) => {
    return pathname === href;
  };

  // Choose navigation items based on authentication status
  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <Disclosure
      as="nav"
      className="border-b border-gray-200 bg-white shadow-lg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group focus:ring-accent-500 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/logo.png"
                  alt="Resetrix"
                  width={140}
                  height={140}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.filter((item) => item.isShow).length > 1 &&
                navItems
                  .filter((item) => item.isShow)
                  .map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      data-active={isActive(item.href)}
                      className={classNames(
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200",
                        isActive(item.href)
                          ? "border-accent-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "focus:border-accent-500 focus:text-gray-900 focus:outline-none",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <AuthButton />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-3">
          {navItems
            .filter((item) => item.isShow)
            .map((item) => (
              <DisclosureButton
                key={item.label}
                as={Link}
                href={item.href}
                data-active={isActive(item.href)}
                className={classNames(
                  "block border-l-4 py-2 pr-4 pl-3 text-base font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "border-accent-500 bg-accent-50 text-accent-700"
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                  "focus:border-accent-500 focus:bg-accent-50 focus:text-accent-700 focus:outline-none",
                )}
              >
                {item.label}
              </DisclosureButton>
            ))}

          {/* Authentication button for mobile */}
          <div className="border-t border-gray-200 pt-4">
            <MobileAuthButton />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
