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

const navItems = [
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

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group focus:ring-primary-700 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                src="/assets/logo.png"
                alt="Resetrix"
                width={160}
                height={160}
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Current: "border-primary-700 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              {navItems.filter((item) => item.isShow).length > 1 &&
                navItems
                  .filter((item) => item.isShow)
                  .map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      data-active={isActive(item.href)}
                      className={classNames(
                        "inline-flex items-center px-1 pt-1 text-sm font-medium",
                        "border-b-2 border-transparent",
                        "data-[active=true]:text-primary-700",
                        "hover:text-primary-700",
                        "focus:text-primary-700",
                        "font-dm-sans",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href="/signin" className="btn inline-flex items-center">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-4">
          {navItems
            .filter((item) => item.isShow)
            .map((item) => (
              <DisclosureButton
                key={item.label}
                as={Link}
                href={item.href}
                data-active={isActive(item.href)}
                className={classNames(
                  "block w-full border-l-4 py-2 pr-4 pl-3 text-base font-medium",
                  "border-transparent",
                  "data-[active=true]:border-primary-700 data-[active=true]:bg-primary-50 data-[active=true]:text-primary-700",
                  "hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                  "font-dm-sans",
                )}
              >
                {item.label}
              </DisclosureButton>
            ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
