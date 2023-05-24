'use client';

import { usePathname } from 'next/navigation';
import { SyncingIcon } from '@/components/Icons';
import SimpleSelect from '@/components/SimpleSelect';

const PATHS = {
  dashboard: 'Dashboard',
  accounts: 'Accounts',
  investments: 'Investments',
};

const CURRENCY_OPTIONS = [
  { value: 'GBP', label: 'GBP', icon: '/countries/country-GB.svg' },
  { value: 'USD', label: 'USD', icon: '/countries/country-US.svg' },
  { value: 'EUR', label: 'EUR', icon: '/countries/country-EU.svg' },
];

export default function Navbar() {
  const pathname = usePathname();
  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 flex h-20 items-center justify-between border-b-2 border-neutral-200 bg-neutral-50">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex space-x-2">
        <SimpleSelect
          options={CURRENCY_OPTIONS}
          defaultValue={CURRENCY_OPTIONS[0].value}
          onSelect={(option) => {
            console.log(option);
          }}
        />
        <button className="rounded-lg bg-white p-2.5 hover:bg-neutral-100">
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
