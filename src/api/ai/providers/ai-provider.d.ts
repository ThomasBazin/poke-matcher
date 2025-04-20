export interface AIProviderInterface {
  POST: (prompt: string) => Promise<string>;
}
