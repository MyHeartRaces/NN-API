import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    try {
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ email, password: hashedPassword });
        await userRepository.save(user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
