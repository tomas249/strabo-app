'use client';

import { MutableRefObject, RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DropdownIcon, SyncingIcon } from '@/components/Icons';
import { useOutside } from '@/hooks/useOutside';
import Image from 'next/image';

const PATHS = {
  dashboard: 'Dashboard',
  accounts: 'Accounts',
  investments: 'Investments',
};

const CURRENCY_OPTIONS = [
  { value: 'gbp', label: 'GBP', icon: '/countries/country-GB.svg' },
  { value: 'usd', label: 'USD', icon: '/countries/country-US.svg' },
  { value: 'eur', label: 'EUR', icon: '/countries/country-EU.svg' },
];

const example = CURRENCY_OPTIONS[0];

export default function Navbar() {
  const pathname = usePathname();

  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 flex h-20 items-center justify-between border-b-2 border-neutral-200 bg-neutral-50">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex space-x-2">
        <OverlayWrapper>
          <SelectButton icon={example.icon} label={example.label} />
        </OverlayWrapper>
        <button className="rounded-lg bg-white p-2.5 hover:bg-neutral-200">
          <SyncingIcon />
        </button>
      </div>
    </div>
  );
}

function getFirstPath(path: string, paths: Record<string, string>) {
  const currentPaths = path.slice(1).split('/');
  const firstPath = currentPaths[0];
  if (!paths[firstPath]) throw new Error(`Path ${firstPath} not found`);

  return paths[firstPath];
}

type SelectButtonProps = {
  icon: string;
  label: string;
};

const SelectButton = ({ icon, label }: SelectButtonProps) => {
  return (onClick: () => void) => (
    <button
      className="flex items-center rounded-lg bg-white px-2.5 py-[8.5px] hover:bg-neutral-100"
      onClick={onClick}
    >
      {/* {icon} */}
      <Image src={icon} height="24" width="24" alt="Country" />
      <span className="mx-2.5 font-semibold">{label}</span>
      <DropdownIcon />
    </button>
  );
};

type OverlayOptionsProps = {
  options: {
    label: string;
    value: string;
    icon: string;
  }[];
  onSelect: (value: string) => void;
};
const OverlayOptions = forwardRef<HTMLDivElement | null, { open: boolean }>(({ open }, ref) => {
  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute left-0 flex w-full flex-col rounded-lg border-2 border-neutral-500 bg-white p-2"
    >
      <div className="hover:bg-neutral-200">option 1</div>
      <div className="hover:bg-neutral-200">option 1</div>
      <div className="hover:bg-neutral-200">option 1</div>
    </div>
  );
});

const OverlayWrapper = ({ children }: { children: (cb: () => void) => React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutside(wrapperRef, () => setOpen(false));

  return (
    <div className="relative">
      {children(() => setOpen(true))}
      <OverlayOptions open={open} ref={wrapperRef} />
    </div>
  );
};
