export default function Investments() {
  const longArray = Array.from({ length: 1000 }, (_, i) => i);

  return (
    <>
      {longArray.map((i) => (
        <div key={i} className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-neutral-100" />
            <div className="flex flex-col">
              <div className="h-4 w-24 rounded bg-neutral-100" />
              <div className="mt-1 h-3 w-16 rounded bg-neutral-100" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-neutral-100" />
            <div className="flex flex-col">
              <div className="h-4 w-24 rounded bg-neutral-100" />
              <div className="mt-1 h-3 w-16 rounded bg-neutral-100" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
