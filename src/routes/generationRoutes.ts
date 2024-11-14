import { Router } from 'express';
import { generateTextStream } from '../controllers/generationController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Generation
 *   description: Text generation using neural network models
 */

/**
 * @swagger
 * /api/generate:
 *   post:
 *     summary: Generate text using a specified model
 *     tags: [Generation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Generation parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model
 *               - prompt
 *             properties:
 *               model:
 *                 type: string
 *                 example: gpt-4
 *               prompt:
 *                 type: string
 *                 example: "Once upon a time"
 *     responses:
 *       200:
 *         description: Streaming text response
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: "data: This is a streaming response\\n\\n"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authenticate as any, generateTextStream as any);

export default router;
