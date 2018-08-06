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


async function getOpenOrderList(req,res){
    let limit = req.params.limit || 10
    let offset = req.params.offset || 0

  mongoose.connect(process.env.MONGODB_URL,mongdbAuth)
    mongoose.connection.on('connected', () => {
    console.info(`Mongoose default connection open to ${uri}`)
    })

    // Connection throws an error
    mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))

    // Connection is disconnected
    mongoose.connection.on('disconnected', () => {
    console.info('Mongoose default connection disconnected')
    })
    try{
      let orderList = await OpenOrder.find({status: 1}).skip(offset).sort({adfee: -1}).limit(limit).exec()
      let orderCount = await OpenOrder.count({status: 1})
      let returnJson = {
        orderCount: orderCount,
        orderList: orderList
      }
      res.json(returnJson)
    }catch(err){
      res.error(err)
    }
}

async function getOrderByAcc(req,res){
  let {acc} = req.params
  mongoose.connect(process.env.MONGODB_URL,mongdbAuth)
  mongoose.connection.on('connected', () => {
    console.info(`Mongoose default connection open to ${uri}`)
  })

  // Connection throws an error
  mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))

  // Connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.info('Mongoose default connection disconnected')
  })
  try{
    let order = await OpenOrder.find({acc: acc}).exec()
    res.json(order)
  }catch(err){
    res.error(err)
  }

}

async function getOrderListBySeller(req,res){
  let {seller} = req.params
  mongoose.connect(process.env.MONGODB_URL,mongdbAuth)
  mongoose.connection.on('connected', () => {
    console.info(`Mongoose default connection open to ${uri}`)
  })

  // Connection throws an error
  mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))

  // Connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.info('Mongoose default connection disconnected')
  })
  try{
    let orderList = await OpenOrder.find({seller: seller}).exec()
    res.json(orderList)
  }catch(err){
    res.error(err)
  }
}

const bidNameCloudFuncs = {
  getOpenOrderList: getOpenOrderList,
  getOrderByAcc: getOrderByAcc,
  getOrderListBySeller: getOrderListBySeller


}

module.exports = bidNameCloudFuncs