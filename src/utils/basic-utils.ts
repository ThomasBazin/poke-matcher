export function capitalizeFirstLetter(word: string): string {
  const firstLetter = word.charAt(0);
  return word.replace(firstLetter, firstLetter.toUpperCase());
}
