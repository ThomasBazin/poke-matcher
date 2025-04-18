import { type MatchedPokemonType } from '@/types/matched-pokemon';

import ImageWithFallback from '@/components/ui/image-with-fallback';
import { Button } from '@/components/ui/button';

interface QuizResultPropsInterface {
  matchedPokemon: MatchedPokemonType;
}
export default function QuizResult({
  matchedPokemon,
}: QuizResultPropsInterface) {
  return (
    <div className="h-full flex flex-col gap-4 items-center">
      <h2 className="text-lg font-semibold ">Your Pokémon is :</h2>
      <ImageWithFallback
        src={matchedPokemon.image}
        fallbackSrc="/pokeball-icon-10.jpg"
        alt={matchedPokemon.name}
        className="w-30 h-30 object-contain"
        width={40}
        height={40}
      />
      <h3 className="text-xl font-bold text-secondary capitalize">
        {matchedPokemon.name}
      </h3>

      <div className="flex-1 flex flex-col items-center justify-between gap-3 overflow-y-scroll">
        <p className="px-4 text-muted-foreground text-sm text-pretty">
          {matchedPokemon.justification}
        </p>
        <Button onClick={() => location.reload()}>Play again</Button>
      </div>
    </div>
  );
}
