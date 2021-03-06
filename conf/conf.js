const crypto = require('crypto');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

// 新增用户直接在user字段新增就ok
let conf = {
    port: 10244,
    secret: 'minify-upload',
    host: 'http://127.0.0.1:10244/',
    accept: { // 以竖线分隔
        '.jpg|.png|.jpeg': { // image类型的最大上传3M,maxSize:3M
            maxSize: 100
        },
        '.zip|.gif': {
            maxSize: 4
        }
    },
    user: [
        { name: 'soul', pw: '123456' },
        { name: 'soul2', pw: '123456' }
    ]
};


// 预先编译存储至内存
for (let i of conf.user) {
    const hmac = crypto.createHmac('sha256', conf.secret);
    hmac.update(`${i.name}-${i.pw}`);
    i['hex'] = hmac.digest('hex');
}
module.exports = conf;