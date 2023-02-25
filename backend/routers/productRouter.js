import express from 'express';
const router = express.Router();

import productController from '../controllers/productController';
import { authentication, authenticationCookie, isAdmin } from '../middleware/tokenAccess';

// router.get('/', productController.getAllProduct);

router.get('/', productController.getProductByKey);

router.get('/:id', productController.getProductById);

router.post('/', authenticationCookie, productController.createProduct);

router.put('/:id', authenticationCookie, isAdmin, productController.updatedProduct);

router.delete('/:id', authenticationCookie, isAdmin, productController.deleteProduct);

export default router;