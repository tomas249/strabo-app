'use client';

import SearchSelect from '@/components/SearchSelect';
import { CURRENCY_OPTIONS } from '@/utils/constants';

export default function Investments() {
  const longArray = Array.from({ length: 1000 }, (_, i) => i);

  return (
    <div className="pt-3">
      <span className="mb-1 text-sm font-semibold">Find stock:</span>
      <SearchSelect
        options={CURRENCY_OPTIONS}
        defaultValue={CURRENCY_OPTIONS[0].value}
        onSelect={(option) => {
          console.log(option);
        }}
      />
    </div>
    // <>
    //   {longArray.map((i) => (
    //     <div key={i} className="flex items-center justify-between py-2.5">
    //       <div className="flex items-center gap-2">
    //         <div className="h-8 w-8 rounded-full bg-neutral-100" />
    //         <div className="flex flex-col">
    //           <div className="h-4 w-24 rounded bg-neutral-100" />
    //           <div className="mt-1 h-3 w-16 rounded bg-neutral-100" />
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="h-8 w-8 rounded-full bg-neutral-100" />
    //         <div className="flex flex-col">
    //           <div className="h-4 w-24 rounded bg-neutral-100" />
    //           <div className="mt-1 h-3 w-16 rounded bg-neutral-100" />
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </>
  );
}
