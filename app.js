const Koa = require('koa');
const staticKoa = require('koa-static');
const router = require('./app/route');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const multer = require('koa-multer');
const CLIEngine = require('eslint').CLIEngine;
const path = require('path');
// const upload = multer({ dest: './uploads/' });

const cli = new CLIEngine({
    envs: ['node'],
    useEslintrc: true,
});

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
console.log('当前运行版本', process.version, '当前运行环境', env);
// lint myfile.js and all files in lib/
const report = cli.executeOnFiles([path.join(__dirname, './app/**/*.js'), './app.js']);

// get the default formatter
const formatter = cli.getFormatter();

// output to console
let output;
if (env === 'development') {
    output = formatter(report.results);
}

if (output) {
    console.error(output);
    return false;
}

const app = new Koa();
const root = './public';
const opts = {};
const conf = require('./conf/conf');
app.context.resData = function({ code, msg, data }) {
    this.response.ctx.body = { code, msg, data };
};
app
// .use(upload)
    .use(staticKoa(root, opts))
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(conf.port, () => {
    console.log('success run ', conf.port);
    if (env !== 'development') {
        console.log('Production mode does not need to check eslint');
    }
});