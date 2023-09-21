import productController from '../controllers/productController.js';
import express from 'express';
const router = express.Router();

router.get('/allproduct', productController.getAllProduct);
router.get('/getproduct/:id', productController.getProductById);
router.post('/addproduct', productController.createProduct);
router.put('/updateproduct/:id', productController.updateProduct);
router.delete('/deleteproduct/:id', productController.deleteProduct);
router.delete('/deleteall/', productController.deleteAllProducts);
router.get('/getpublishedproduct', productController.findAllPublished);

export default router;