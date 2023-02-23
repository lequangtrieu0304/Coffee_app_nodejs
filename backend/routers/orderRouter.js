import express from 'express';
const router = express.Router();

import orderController from '../controllers/orderController';
import { authentication, isAdmin } from '../middleware/tokenAccess';

router.get('/summary', authentication, isAdmin, orderController.summaryOrder);

router.get('/selling-products', orderController.sellingProducts);

router.get('/', orderController.getAllOrder);

router.get('/:id', orderController.getOrderById);

router.post('/auth', authentication, orderController.createOrderLogin);

router.post('/', orderController.createOrder);

export default router;