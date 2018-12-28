const Router = require('koa-router')
const {waitForTimeout} = require('../lib/utils')
const log4js = require('../lib/log')
const router = new Router();

const logger = log4js.getLogger('default')
const errlogger = log4js.getLogger('error')

router.get('/user', async (ctx) => {
    logger.info(ctx.request)
    try {
        await waitForTimeout(2000)
        ctx.body = 'hello world'    
    } catch(e) {
        errlogger.error(e)
    }
})

module.exports = router