import { Model } from './Model';
import axios from 'axios';

export class GPT4Model implements Model {
    name = 'GPT-4';
    pricePer100Tokens = 20; // 100 токенов = 20 кредитов для GPT-4

    async generate(prompt: string, onChunk: (chunk: string) => void): Promise<void> {
        const response = await axios.post(
            'https://bothub.chat/api/v2/openai/v1/',
            {
                model: 'gpt-4',
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
