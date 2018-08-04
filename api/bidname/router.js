/**
 * Created by lilu on 2018/8/2.
 */
const express = require('express')
const orderController = require('./controller')

const router = express.Router()

router.route('/').get(orderController.listOrders)

module.exports = router