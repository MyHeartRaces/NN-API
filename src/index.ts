import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import authRoutes from './routes/authRoutes';
import balanceRoutes from './routes/balanceRoutes';
import generationRoutes from './routes/generationRoutes';
import { swaggerUi, swaggerDocument } from './utils/swagger';
import dotenv from 'dotenv';
import cors from 'cors';
import ormconfig from './ormconfig';

dotenv.config();

const createServer = async () => {
        await createConnection(ormconfig);
        const app = express();
        app.use(express.json());
        app.use(cors());

        app.use('/api/auth', authRoutes);
        app.use('/api/balance', balanceRoutes);
        app.use('/api/generate', generationRoutes);
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.get('/', (req, res) => {
                res.send('Neural Network API is running');
        });

        return app;
};

export default createServer;

if (require.main === module) {
        const PORT = process.env.PORT || 5000;
        createServer().then(app => {
                app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        }).catch(error => console.log('TypeORM connection error:', error));
}
