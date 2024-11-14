import { Model } from './Model';
import { GPT4Model } from './GPT4Model';
import { GeminiFlashModel } from './GeminiFlashModel';

export class ModelFactory {
    static getModel(modelName: string): Model {
        switch (modelName) {
            case 'gpt-4':
                return new GPT4Model();
            case 'gemini-flash':
                return new GeminiFlashModel();
            default:
                throw new Error(`Model ${modelName} is not supported`);
        }
    }
}
