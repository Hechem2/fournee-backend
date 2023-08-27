const express = require("express");
const {createProduct, getProducts, getProduct, removeProduct, updateProduct} = require('../controllers/productControllers');

const router = express.Router();

router.post('/add', createProduct);

router.get('/all', getProducts);

router.get('/:id', getProduct);

router.delete('/:id', removeProduct);

router.put('/:id', updateProduct);

module.exports = router;