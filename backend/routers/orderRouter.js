import express from 'express';
const router = express.Router();

import orderController from '../controllers/orderController';

router.get('/', orderController.getAllOrder);

router.get('/:id', orderController.getOrderById);

router.post('/', orderController.createOrder);

export default router;