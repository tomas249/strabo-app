'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LogoIcon,
  ShowHideIcon,
  DashboardIcon,
  ListIcon,
  TrendingUpIcon,
  LogOutIcon,
  PlusIcon,
} from '@/components/Icons';

type SidebarProps = {
  width: number;
};

export const Sidebar = ({ width }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div style={{ width }} className="fixed left-0 top-0 flex h-full border-r-2 border-neutral-200">
      <div className="flex w-full flex-col justify-between px-4 pb-7 pt-1">
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="flex justify-between py-6">
            <div className="ml-2 flex items-center space-x-3">
              <Link href="/">
                <LogoIcon />
              </Link>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-neutral-300 hover:bg-neutral-100 hover:text-purple-500">
              <ShowHideIcon />
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-1">
            {[
              { icon: <DashboardIcon />, href: '/dashboard', text: 'Dashboard' },
              { icon: <ListIcon />, href: '/accounts', text: 'Accounts' },
              { icon: <TrendingUpIcon />, href: '/investments', text: 'Investments' },
            ].map(({ icon, href, text }) => (
              <Button key={href} icon={icon} href={href} text={text} selected={pathname === href} />
            ))}
          </div>

          <hr className="my-2.5 border-neutral-100" />

          {/* ADD PAGE */}
          <button className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2 text-base font-semibold hover:bg-neutral-100">
            Add page
            <PlusIcon />
          </button>
        </div>

        {/* BOTTOM */}
        <div className="space-y-1">
          <Button
            icon={
              <Image
                src="/avatar.png"
                alt="avatar"
                width={24}
                height={24}
                className="rounded-full"
              />
            }
            href="/"
            text="Settings"
          />
          <Button icon={<LogOutIcon />} href="/" text="Log out" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

type ButtonProps = {
  icon: React.ReactNode;
  href: string;
  text: string;
  selected?: boolean;
};

function Button({ icon, href, text, selected }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`flex h-11 w-full items-center space-x-3 rounded-xl px-4 py-2 ${
        selected ? 'bg-primary-100 text-primary-500' : 'text-neutral-700 hover:bg-primary-100'
      }`}
    >
      {icon}
      <span className="text-lg font-medium">{text}</span>
    </Link>
  );
}
