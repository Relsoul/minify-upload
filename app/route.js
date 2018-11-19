const Router = require('koa-router');
const multer = require('koa-multer');
const authUser = require('./middleware/auth-user');
const router = new Router();
const ctrl = require('./control/main');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        const fileInfo = path.parse(file.originalname);
        cb(null, fileInfo.name + '-' + Date.now() + fileInfo.ext);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', authUser, upload.single('filepond'), ctrl.upload);

module.exports = router;