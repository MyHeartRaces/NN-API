import { Model } from './Model';
import axios from 'axios';

export class GeminiFlashModel implements Model {
    name = 'Gemini-Flash';
    pricePer100Tokens = 10; // 100 токенов = 10 кредитов для Gemini-Flash

    async generate(prompt: string, onChunk: (chunk: string) => void): Promise<void> {
        const response = await axios.post(
            'https://bothub.chat/api/v2/openai/v1/',
            {
                model: 'gemini-flash',
                prompt: prompt,
                stream: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                responseType: 'stream',
            }
        );

        response.data.on('data', (chunk: Buffer) => {
            const message = chunk.toString();
            onChunk(message);
        });
    }
}
