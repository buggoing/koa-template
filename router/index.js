const Router = require('koa-router')
const annotation = require('../controller/annotation')
const {waitForTimeout} = require('../lib/utils')
const userRouter = require('./user')
const log4js = require('../lib/log')

const router = new Router()

const logger = log4js.getLogger('default')
const errlogger = log4js.getLogger('error')


router.all('*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Allow', 'PUT,POST,GET,DELETE,OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Headers', 'Authorization,content-type')

    if (ctx.req.method === 'OPTIONS') {
        ctx.status = 200
    }
    logger.info(ctx.req.method, ctx.req.url, ctx.request.body)
    let startTime = Date.now()
    await next()
    logger.info('elapse: ', Date.now() - startTime)

})

router.get('/', async (ctx) => {
    logger.info(ctx.request)
    try {
        await waitForTimeout(2000)
        ctx.body = 'hello world'    
    } catch(e) {
        errlogger.error(e)
    }
})

router.get('/annotation/allusers', async (ctx) => {
    try {
        let allUsers = await annotation.getAllUsers()
        let users = []
        for (let row of allUsers) {
            let user = {}
            user.id = row.id
            user.name = row.real_name
            user.grade = row.grade
            users.push(user)
        }
        let result = {
            code: 0,
            data: users
        }
        ctx.body = result
    } catch (err) {
        logger.info(err)
        ctx.body = {
            code: 1000
        }
    }
})

router.post('/annotation/assign_image', async (ctx) => {
    logger.info(ctx.request.body)
    let imageidList = ctx.request.body.imageidList
    let userid = ctx.request.body.userid
    let optype = ctx.request.body.optype
    let src_src = ctx.request.body.src_src
    try {
        let res = await annotation.assignImage(imageidList, userid, optype, src_src)
        let result = {
            code: 0,
            data: res
        }
        ctx.body = result
    } catch (err) {
        errlogger.error(err)
        ctx.body = {
            code: 1000
        }
    }
})

router.post('/', async (ctx) => {
    logger.info(ctx.request)
    // await relay(7 * 1000)
    ctx.body = { 'res': 'ok', 'key': 'test_key' }

})

router.post('/upload', async (ctx) => {
    // logger.info(ctx.request)
    // logger.info(ctx.request.ip)
    let data = ctx.request.body
    logger.info(data)
    logger.info(data['key'])
    if (data['key'].endsWith('1.jpg'))
        ctx.body = { 'res': 'ok', 'key': 'test_key' }
    else
        ctx.body = { 'res': 'test_key' }
})

router.post('/device/init', async (ctx) => {
    logger.info('in init')
    let data = ctx.request.body
    logger.info(data)
    ctx.body = { 'code': 0 }
})


router.post('/device/open_lock', async (ctx) => {
    ctx.body = { 'code': 0 }
})
router.post('/device/open_door', async (ctx) => {
    ctx.body = { 'code': 0 }
})

router.post('/device/close', async (ctx) => {
    ctx.body = { 'code': 0 }
})

router.post('/device/report', async (ctx) => {
    ctx.body = { 'code': 0 }
})

router.post('/device/restart_readiness', async (ctx) => {
    // await relay(4 * 1000)
    ctx.body = { 'code': 0 }
})

router.post('/image/detect', async (ctx) => {
    let data = ctx.request.body
    let pics = data['pics']
    logger.info('pics: ', pics)
    ctx.body = { 'code': 0 }
})

router.use(userRouter.routes())

module.exports = router
