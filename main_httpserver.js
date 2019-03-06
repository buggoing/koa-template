const http = require('http')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const router = require('./router')

const config = require('./config')
const app = new Koa()
const server = http.createServer(app.callback())

app.use(require('koa-body')({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}))
app.use(serve(path.join(__dirname, '../tool-client/dist')))
app.use(bodyParser())

app.use(router.routes())

server.listen(config.serverListenPort, () => {
    let address = server.address()
    console.log('listening on: http://localhost:%s', address.port)
})

// process.on('SIGINT', () => {
//     server.keepAliveTimeout = 1
//     console.log('received sigint')
//     server.close(() => {
//         console.log('closed')
//         process.exit(0)
//     })
// })
