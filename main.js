const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path')
const router = require('./router')

const app = new Koa();
app.use(serve(path.join(__dirname, '../tool-client/dist')));
app.use(bodyParser())
app.use(router.routes())

app.listen(18888);