const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/order.controller")

router.get('/', controller.index)

router.post('/', controller.orderPOST)

router.get('/success/:id', controller.success)
module.exports = router;