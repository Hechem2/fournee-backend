const express = require("express");
const {createUser, getUsers, getUser, deleteUser, updateUser, registerUser, loginUser} = require('../controllers/usercontrollers');
const {verifyToken} = require('../middleware/middleware');

const router = express.Router();

router.post('/add', createUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/all', getUsers);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

module.exports = router;