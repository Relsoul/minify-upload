const conf = require('../../conf/conf');
module.exports = async function (ctx, next) {
    const req = ctx.request;
    const token = req.get('utoken');
    if (!token || !token.trim()) {
        return ctx.resData({
            code: -1,
            msg: '请传递utoken在头部',
            data: null
        });
    }
    let isFind = conf.user.find((n) => {
        return n.hex === token;
    });

    if (!isFind) {
        return ctx.resData({
            code: -1,
            msg: 'utoken无效',
            data: null
        });
    }

    ctx.state.user = isFind;
    await next();
};