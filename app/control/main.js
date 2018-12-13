const path = require('path');
const fs = require('fs-extra');
const conf = require('../../conf/conf');

async function deleteFile(path) {
    let res;
    try {
        res = await fs.remove(path);
    } catch (e) {
        return Promise.reject(new Error(e));
    }
    return Promise.resolve(res);
}

module.exports['upload'] = async function(ctx) {
    const req = ctx.req;
    const fileInfo = path.parse(req.file.filename);
    let keys = Object.keys(conf.accept);
    let isFind = keys.find(n => {
        let reg = new RegExp(n);
        let isAccept = reg.test(fileInfo.ext.toLowerCase());
        return isAccept;
    });

    if (!isFind) {
        await deleteFile(req.file.path);
        return ctx.resData({
            __status: 501,
            code: -1,
            msg: `文件不被接受，请传递${keys.join(',')}类型的文件`,
            data: {}
        });
    }

    const confAcceptItem = conf.accept[isFind];

    if (req.file.size / (1024 * 1024) > confAcceptItem.maxSize) {
        await deleteFile(req.file.path);
        return ctx.resData({
            __status: 501,
            code: -1,
            msg: `文件大小超出${confAcceptItem.maxSize}M`,
            data: {}
        });
    }

    return ctx.resData({
        code: 1,
        msg: '上传成功',
        data: {
            filename: req.file.filename,
            url: path.join(conf.host, req.state.__userProjectPath, req.file.filename)
        }
    });
};
