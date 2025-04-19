import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl text-white font-bold text-shadow-md">
          Page not found...
        </h2>
      </div>
      <Link href={'/'}>
        <Button className="text-xl p-8 text-shadow-xs cursor-pointer">
          Back to home
        </Button>
      </Link>
    </main>
  );
}
