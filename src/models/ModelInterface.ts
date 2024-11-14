export interface ModelInterface {
    name: string;
    pricePer100Tokens: number;
    generate: (prompt: string, onData: (chunk: string) => void) => Promise<void>;
}
