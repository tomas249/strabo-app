'use client';

import { usePathname } from 'next/navigation';

const PATHS = {
  dashboard: 'Dashboard',
  accounts: 'Accounts',
  investments: 'Investments',
};

export default function Navbar() {
  const pathname = usePathname();

  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 flex h-20 items-center justify-between border-b-2 border-neutral-200 bg-neutral-50">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div>
        <button className=" roun">EUR</button>
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
