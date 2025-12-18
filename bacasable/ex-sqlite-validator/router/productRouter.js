const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

const {
    validateCreateProduct,
    validateUpdateProduct,
    validateGetProductById,
    validateDeleteProduct
} = require('../validators/productValidator');

// Routes sans validation
router.get('/', productController.getAllProducts);

// Routes avec validation
router.get('/:id', validateGetProductById, productController.getProductById);
router.post('/', validateCreateProduct, productController.createProduct);
router.put('/:id', validateUpdateProduct, productController.updateProduct);
router.delete('/:id', validateDeleteProduct, productController.deleteProduct);

module.exports = router;
