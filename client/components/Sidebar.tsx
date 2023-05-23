'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LogoIcon,
  ShowHideIcon,
  DashboardIcon,
  ListIcon,
  TrendingUpIcon,
} from '@/components/Icons';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-[274px] border-r-2 border-[#D3D3E0]">
      <div className="flex w-full flex-col justify-between px-4 pb-4 pt-1">
        <div>
          <div className="flex justify-between py-3">
            <div className="ml-2 flex items-center space-x-3">
              <Link href="/">
                <LogoIcon />
              </Link>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-neutral-300 hover:bg-[#EBEBF3] hover:text-purple-500">
              <ShowHideIcon />
            </button>
          </div>

          <div className="space-y-1">
            <Link href="/" className="flex h-11 w-full rounded-xl px-4 py-2 text-left">
              <DashboardIcon />
              Dashboard
            </Link>
            <button className="h-11 w-full rounded-xl px-4 py-2 text-left hover:bg-[#bcb5fa]">
              Dashboard
            </button>
            <button className="h-11 w-full rounded-xl px-4 py-2 text-left hover:bg-[#bcb5fa]">
              Dashboard
            </button>
            <button className="h-11 w-full rounded-xl bg-[#ECEAFF] px-4 py-2 text-left text-[#5547F6] hover:bg-[#bcb5fa]">
              Dashboard
            </button>
          </div>
          <hr className="my-[10px]" />
          <button className="h-10 w-full rounded-xl bg-white px-4 py-2 font-semibold hover:bg-[#EBEBF3]">
            Add page +
          </button>
        </div>

        <div className="space-y-1">
          <button className="h-10 w-full rounded-xl bg-white px-4 py-2 font-semibold hover:bg-[#EBEBF3]">
            Add page +
          </button>
          <button className="h-10 w-full rounded-xl bg-white px-4 py-2 font-semibold hover:bg-[#EBEBF3]">
            Add page +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
