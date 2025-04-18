import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center">
      <h2 className="text-sm font-bold text-center">{message}</h2>

      <Button className="text-shadow-xs w-fit">
        <Link href={'/'}>Back to home</Link>
      </Button>
    </div>
  );
}
