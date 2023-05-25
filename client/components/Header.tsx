'use client';

import { usePathname } from 'next/navigation';
import { SyncingIcon } from '@/components/Icons';
import SimpleSelect from '@/components/SimpleSelect';
import { CURRENCY_OPTIONS, PATHS } from '@/utils/constants';

export default function Header() {
  const pathname = usePathname();
  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 z-10 mx-8 flex min-h-[80px] items-center justify-between border-b-[1px] border-neutral-200 bg-neutral-50">
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
