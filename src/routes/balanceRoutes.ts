import { Router } from 'express';
import { getBalance, updateBalance } from '../controllers/balanceController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: User balance management
 */

/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: Get user balance
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate as any, getBalance as any);

/**
 * @swagger
 * /api/balance/update:
 *   post:
 *     summary: Update user balance
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Update balance
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post('/update', authenticate as any, authorize(['admin']) as any, updateBalance as any);

export default router;
