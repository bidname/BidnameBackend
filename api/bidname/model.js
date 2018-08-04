/**
 * Created by lilu on 2018/8/2.
 */
const mongoose = require('mongoose')

const { Schema } = mongoose

let OpenOrder = null
let CompOrder = null
try {
  const OpenOrderSchema = new Schema({
    seller: String,
    acc: String,
    buyer: String,
    newpkey: String,
    createdat: Date,
    placeat: Date,
    adfee: {
      amount: Number,
      symbol: String,
    },
    price: {
      amount: Number,
      symbol: String,
    },
    status: Number,
  })
  OpenOrder = mongoose.model('openorders', OpenOrderSchema)
} catch (e) {
  OpenOrder = mongoose.model('openorders')
}

try {
  const CompOrderSchema = new Schema({
    seller: String,
    acc: String,
    buyer: String,
    createdat: Date,
    finishat: Date,
    price: {
      amount: Number,
      symbol: String,
    },
  })
  CompOrder = mongoose.model('comporders', CompOrderSchema)
} catch (e) {
  CompOrder = mongoose.model('comporders')
}

module.exports = {
  OpenOrder,
  CompOrder,
}
