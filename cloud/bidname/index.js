/**
 * Created by lilu on 2018/8/3.
 */
const mongoose = require('mongoose')
var  Order = require ('../../api/bidname/model')
const account = process.env.EOSIO_CONTRACT_ACCOUNT
const OpenOrder = Order.OpenOrder
const CompOrder = Order.CompOrder
const mongdbAuth = {user: process.env.MONGODB_USER, pass: process.env.MONGODB_PASS}
const { Schema } = mongoose


async function getOpenOrderList(req,res,next) {
    let limit = req.query.limit || 10
    let offset = req.query.offset || 0
    if(typeof (limit) != "number"){
      limit = parseInt(limit)
    }
    if(typeof (offset) != "number"){
      offset = parseInt(offset)
    }  // mongoose.connect(process.env.MONGODB_URL,mongdbAuth)
  //   mongoose.connection.on('connected', () => {
  //   console.info(`Mongoose default connection open to ${uri}`)
  //   })
  //
  //   // Connection throws an error
  //   mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))
  //
  //   // Connection is disconnected
  //   mongoose.connection.on('disconnected', () => {
  //   console.info('Mongoose default connection disconnected')
  //   })
    try{
      let orderCount = await OpenOrder.count({status: 1})
      let orderList = await OpenOrder.find({status: 1},null,{skip: offset, limit: limit, sort: {'adfee.amount': -1}}).exec()
      let returnJson = {
        orderCount: orderCount,
        orderList: orderList
      }
      res.json(returnJson)
    }catch(err){
      next(err)
    }
}

async function getOrderByAcc(req,res,next){
  let {acc} = req.query
  try{
    let order = await OpenOrder.find({acc: acc}).exec()
    res.json(order)
  }catch(err){
    next(err)
  }

}

async function getOrderListBySeller(req,res,next){
  let {seller} = req.query
  try{
    let orderList = await OpenOrder.find({seller: seller}).exec()
    res.json(orderList)
  }catch(err){
    next(err)
  }
}

const bidNameCloudFuncs = {
  getOpenOrderList,
  getOrderByAcc,
  getOrderListBySeller


}

module.exports = bidNameCloudFuncs