import express from 'express';
const router = express.Router();

import productController from '../controllers/productController';
import { authentication, isAdmin } from '../middleware/tokenAccess';

// router.get('/', productController.getAllProduct);

router.get('/', productController.getProductByKey);

router.get('/:id', productController.getProductById);

router.post('/', authentication, productController.createProduct);

router.put('/:id', authentication, isAdmin, productController.updatedProduct);

router.delete('/:id', authentication, isAdmin, productController.deleteProduct);

export default router;