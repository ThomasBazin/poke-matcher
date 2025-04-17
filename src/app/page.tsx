import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl text-white font-bold">
          Welcome to Poke Matcher !
        </h2>
        <p className="font-semibold text-muted">
          Let&apos;s discover the Pokémon that matches your personality.
        </p>
      </div>

      <Button className="text-2xl p-8">
        <Link href={'/quiz'}>Take the quiz !</Link>
      </Button>
    </main>
  );
}
