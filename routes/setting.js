const express = require("express");
const { getSetting, updateSetting} = require('../controllers/settingControllers');

const router = express.Router();

router.get('/', getSetting);

router.put('/:id', updateSetting);

module.exports = router;