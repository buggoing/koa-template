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
    console.log(ctx.request.body)
    await next()

});

router.get('/', async (ctx, next) => {
    console.log(ctx.request)
    ctx.body = 'hello world'
})

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

async function relay(delay) {
    return await timeout(delay);
}

async function timeout(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("random");
        }, delay);
    });
};


router.post('/', async (ctx, next) => {
    console.log(ctx.request)
    // await relay(7 * 1000)
    ctx.body = { 'res': 'ok', 'key': 'test_key' }

})

router.post('/upload', async (ctx, next) => {
    // console.log(ctx.request)
    // console.log(ctx.request.ip)
    let data = ctx.request.body
    console.log(data)
    console.log(data['key'])
    if (data['key'].endsWith('1.jpg'))
        ctx.body = { 'res': 'ok', 'key': 'test_key' }
    else
        ctx.body = { 'res': 'test_key' }
})

router.post('/device/init', async (ctx, next) => {
    console.log('in init')
    let data = ctx.request.body
    console.log(data)
    ctx.body = { 'code': 0 }
})


router.post('/device/open_lock', async (ctx, next) => {
    ctx.body = { 'code': 0 }
});
router.post('/device/open_door', async (ctx, next) => {
    ctx.body = { 'code': 0 }
});

router.post('/device/close', async (ctx, next) => {
    ctx.body = { 'code': 0 }
});

router.post('/device/report', async (ctx, next) => {
    ctx.body = { 'code': 0 }
});

router.post('/device/restart_readiness', async (ctx, next) => {
    // await relay(4 * 1000)
    ctx.body = { 'code': 0 }
});

router.post('/image/detect', async (ctx, next) => {
    let data = ctx.request.body
    let pics = data['pics']
    console.log('pics: ', pics)
    ctx.body = { 'code': 0 }
});

module.exports = router
