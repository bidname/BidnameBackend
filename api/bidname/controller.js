/**
 * Created by lilu on 2018/8/2.
 */
const {OpenOrder} = require('./model')

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
const listOrders = async (req, res) => {
  try {
    const confirmedPosts = await OpenOrder.find().exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}

module.exports = { listOrders }