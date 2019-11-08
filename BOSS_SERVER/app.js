const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const router = require('./routers/router')
const app = express()
var http = require('http').createServer(app)
require('./socket-io/socket-io')(http)



//配置静态资源
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

//配置模板引擎
app.engine('html', require('express-art-template'));
app.set('views', {
  debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//配置post请求中间件
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//cookie中间件
app.use(cookieParser())
//配置路由
app.use(router)

app.use((err, req, res, next) => {
  res.json({
    code: 1,
    msg: err
  })
})

http.listen(4000, (server) => console.log('running on port 4000'))