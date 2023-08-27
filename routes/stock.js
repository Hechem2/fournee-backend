const express = require("express");
const {createStock, getStocks, getStock, deleteStock, updateStock} = require('../controllers/stockControllers');

const router = express.Router();

router.post('/add', createStock);

router.get('/all', getStocks);

router.get('/:id', getStock);

router.delete('/:id', deleteStock);

router.put('/:id', updateStock);

module.exports = router;