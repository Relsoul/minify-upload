const Router = require('koa-router');
const multer = require('koa-multer');
const authUser = require('./middleware/auth-user');
const fs = require('fs-extra');
const router = new Router();
const ctrl = require('./control/main');
const path = require('path');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __userPath = `${req.state.user.name}/${moment().format('YYYY-MM-DD')}`;
        const __filePath = `../public/uploads/${__userPath}`;
        const userPath = path.join(__dirname, __filePath);
        const userProjectPath = `/public/uploads/${__userPath}`;
        req.state['__userPath'] = userPath;
        req.state['__userProjectPath'] = userProjectPath;
        fs.ensureDirSync(userPath);
        cb(null, userPath);
    },
    filename: function (req, file, cb) {
        const fileInfo = path.parse(file.originalname);
        req.state['__fileExt'] = fileInfo.ext;
        cb(null, fileInfo.name + '-' + Date.now() + fileInfo.ext);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', authUser, upload.single('filepond'), ctrl.upload);

module.exports = router;