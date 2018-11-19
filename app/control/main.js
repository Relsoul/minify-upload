const path = require('path');
const fs = require('fs-extra');
const conf = require('../../conf/conf');
module.exports['upload'] = async function(ctx) {
    const req = ctx.req;
    // console.log('ctx.body', ctx.request.body);
    return ctx.resData({
        code: 1,
        msg: '上传成功',
        data: {
            filename: req.file.filename,
            url: path.join(conf.host, 'uploads', req.file.filename)
        }
    });
};