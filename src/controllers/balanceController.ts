import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}

export const getBalance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userRepository = getRepository(User);
    const userId = req.user?.userId;
    try {
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBalance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userRepository = getRepository(User);
    const { userId, amount } = req.body;

    try {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.balance += amount;
        await userRepository.save(user);

        res.json({ message: 'Balance updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
