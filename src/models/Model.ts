export interface Model {
    name: string;
    pricePer100Tokens: number;
    generate(prompt: string, onChunk: (chunk: string) => void): Promise<void>;
}
