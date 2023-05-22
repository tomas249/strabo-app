import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="ml-[274px]">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">Main Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
}
