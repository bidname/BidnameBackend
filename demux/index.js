/**
 * Created by lilu on 2018/8/2.
 */
const {
  readers: {
    eos: { NodeosActionReader }
  },
  watchers: { BaseActionWatcher }
} = require('demux-js')

const ActionHandler = require('./ActionHandler')

const updaters = require('./updaters')
const effects = require('./effects')

const actionHandler = new ActionHandler(updaters, effects, process.env.MONGODB_URL, {user: process.env.MONGODB_USER,pass: process.env.MONGODB_PASS})

const actionReader = new NodeosActionReader(
  process.env.EOSIO_HTTP_URL,
  parseInt(process.env.EOSIO_STARTING_BLOCK, 10) // First actions relevant to this dapp happen at this block
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  100 // Poll at twice the block interval for less latency
)

module.exports = actionWatcher