/**
 * Created by lilu on 2018/8/2.
 */
var  Order = require ('../../api/bidname/model')
const account = process.env.EOSIO_CONTRACT_ACCOUNT
const OpenOrder = Order.OpenOrder
const CompOrder = Order.CompOrder

function parseTokenString(tokenString) {
  const [amountString, symbol] = tokenString.split(" ")
  const amount = parseFloat(amountString)
  return { amount, symbol }
}

async function createOrder (state, payload, blockInfo, context) {
  try {
    await OpenOrder.findOneAndRemove(
      {
        acc: payload.data.acc,
      }
    ).exec()
    let order = new OpenOrder(
        {
          acc: payload.data.acc,
          seller: payload.data.seller,
          buyer: payload.data.buyer,
          price: parseTokenString(payload.data.price),
          adfee: parseTokenString(payload.data.adfee),
          status: 1,
          createdat: new Date().toLocaleString(),

        }
      )
    await order.save()
  } catch (err) {
    console.error(err)
  }
}

async function cancelOrder(state, payload, blockInfo, context) {
  try {
    await OpenOrder.findOneAndRemove(
      {
        acc: payload.data.acc,
      }
    ).exec()

  } catch (err) {
    console.error(err)
  }
}

async function placeOrder(state, payload, blockInfo, context) {
  try {
    await OpenOrder.findOneAndUpdate(
      {
        acc: payload.data.acc,
      },{
        newpkey: payload.data.newpkey,
        buyer: payload.data.buyer,
        status: 0,
        placeat: new Date().toLocaleString(),
      }
    ).exec()
  } catch (err) {
    console.error(err)
  }
}

async function accRelease(state, payload, blockInfo, context) {
  try {
    let order = await OpenOrder.findOne(
      {
        acc: payload.data.acc,
      }
    ).exec()

    let compOrder = new CompOrder({
      acc: order.acc,
      seller: order.seller,
      price: order.price,
      buyer: order.buyer,
      createdat: order.createdat,
      finishat: new Date().toLocaleString(),
    })
    await compOrder.save()
    await OpenOrder.remove({acc: payload.data.acc}).exec()

  } catch (err) {
    console.error(err)
  }
}

async function setAdfee(state, payload, blockInfo, context) {
  let order = await OpenOrder.findOne(
    {
      acc: payload.data.acc,
    }
  ).exec()

  let oldfee = {
    amount: 0,
    symbol: '',
  }
  oldfee = parseTokenString(payload.data.adfee)
  await OpenOrder.findOneAndUpdate({
    acc: payload.data.acc,
  },{
    adfee: {
      amount: oldfee.amount + order.adfee.amount,
      symbol: order.adfee.symbol
    }
  })
}


async function cancelPlace(state, payload, blockInfo, context) {
  try {
    await OpenOrder.findOneAndUpdate(
      {
        acc: payload.data.acc,
      },{
        newpkey: '',
        buyer: '',
        status: 1,
      }
    ).exec()
  } catch (err) {
    console.error(err)
  }
}

const updaters = [
  {
    actionType: `${account}::createorder`, // account::action name
    updater:createOrder
  },
  {
    actionType: `${account}::cancelorder`, // account::action name
    updater:cancelOrder
  },
  {
    actionType: `${account}::placeorder`, // account::action name
    updater:placeOrder
  },
  {
    actionType: `${account}::setadfee`, // account::action name
    updater:setAdfee
  },
  {
    actionType: `${account}::cancelplace`, // account::action name
    updater:cancelPlace
  },
  {
    actionType: `${account}::accrelease`, // account::action name
    updater:accRelease
  },
]

module.exports = updaters


