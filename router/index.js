const Router = require('koa-router');
const annotation = require('../controller/annotation')

const router = new Router();

router.all('*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set("Allow", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Allow-Headers", "Authorization,content-type")

    if (ctx.req.method === 'OPTIONS') {
        ctx.status = 200
    }
    console.log(ctx.req.method, ctx.req.url)
    await next()

});

router.get('/annotation/allusers', async (ctx, next) => {
    await annotation.getAllUsers().then(res => {
        let users = []
        for (let row of res) {
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
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 1000
        }
    })
});

router.post('/annotation/assign_image', async (ctx, next) => {
    console.log(ctx.request.body)
    let imageidList = ctx.request.body.imageidList
    let userid = ctx.request.body.userid
    let optype = ctx.request.body.optype
    let src_src = ctx.request.body.src_src

    await annotation.assignImage(imageidList, userid, optype, src_src).then(res => {
        let result = {
            code: 0,
        }
        ctx.body = result
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 1000
        }
    })
});

module.exports = router
