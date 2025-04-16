import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function QuizResult() {
  return (
    <div className="h-full flex flex-col gap-4 items-center">
      <h2 className="text-lg font-semibold ">Your Pokémon is :</h2>
      <Image
        src="https://img.pokemondb.net/artwork/large/charmander.jpg"
        alt="charmander"
        className="w-30 h-30 object-contain"
        width={40}
        height={40}
      />
      <h3 className="text-xl font-bold text-secondary">Charmander</h3>

      <div className="flex-1 flex flex-col items-center justify-between gap-3 overflow-y-scroll">
        <p className="px-4 text-muted-foreground text-sm">
          Full of fiery enthusiasm and ready to tackle any challenge, you bring
          the heat to everything you do. Your friends love your passion and
          determination, but they also know you’ve got a warm heart under that
          flame-tipped tail.
        </p>
        <Button>
          <Link href="/quiz">Play again</Link>
        </Button>
      </div>
    </div>
  );
}
