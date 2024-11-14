import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { ModelFactory } from '../models/ModelFactory';
import { Transaction } from '../entities/Transaction';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const generateTextStream = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { model: modelName, prompt } = req.body;
    const userId = req.user.userId;

    // SSE Headers
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });
    res.flushHeaders();

    const userRepository = getRepository(User);
    const transactionRepository = getRepository(Transaction);

    try {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.write(`event: error\ndata: ${JSON.stringify({ message: 'User not found' })}\n\n`);
            res.end();
            return;
        }

        const model = ModelFactory.getModel(modelName);
        const estimatedTokens = 100; // Replace with actual token estimation
        const cost = (estimatedTokens / 100) * model.pricePer100Tokens;

        // Check if user has sufficient balance
        if (user.balance < cost) {
            res.write(`event: error\ndata: ${JSON.stringify({ message: 'Insufficient balance' })}\n\n`);
            res.end();
            return;
        }

        // Deduct cost from user balance
        user.balance -= cost;
        await userRepository.save(user);

        // Record transaction
        const transaction = new Transaction();
        transaction.user = user;
        transaction.amount = -cost;
        transaction.description = `Generation using model ${model.name}`;
        await transactionRepository.save(transaction);

        // Generate text and stream response
        await model.generate(prompt, (chunk: string) => {
            res.write(`data: ${chunk}\n\n`);
        });

        res.write('event: done\ndata: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error('Generation error:', error);
        res.write(`event: error\ndata: ${JSON.stringify({ message: 'Error generating text' })}\n\n`);
        res.end();
    }
};
