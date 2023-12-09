'use client';

import { HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Recipes',
    href: '/recipes',
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, icon, name }) => {
        const LinkIcon = icon;
        return (
          <Link
            key={name}
            href={href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white`,
              { 'bg-gray-900 text-white': pathname === href }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{name}</p>
          </Link>
        );
      })}
    </>
  );
}
