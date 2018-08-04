/**
 * Created by lilu on 2018/8/3.
 */
// require('dotenv').config()
const bidnameCloudFuncs = require('./cloud/bidname')
const app = require('express')()
const cors = require('cors')
const demux = require('./demux')
const postRoutes = require('./api/bidname/router')
const io = require('./utils/io')

app.use(cors())

app.use('/posts', postRoutes)
app.get('/getOpenOrderList', bidnameCloudFuncs.getOpenOrderList)
app.get('/getOrderByAcc', bidnameCloudFuncs.getOrderByAcc)
app.get('/getOrderBySeller', bidnameCloudFuncs.getOrderListBySeller)

const server = app.listen(process.env.PORT, () => console.info(`Example app listening on port ${process.env.PORT}!`))
io.connect(server)

demux.watch()