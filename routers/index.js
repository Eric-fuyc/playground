const Router = require("koa-router");

const router = new Router();

router.get('/', (ctx, next) => {
  const ip = ctx.ip;
  
})

module.exports = router;
