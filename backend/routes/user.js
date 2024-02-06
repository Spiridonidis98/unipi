const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const app = express ();

app.use(express.static(__dirname + '/images/userImages'));
var multer  = require('multer');
/*files*/
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.url.includes('/api/v1/user')) {
            pathfile = path.join(__dirname, '..', '/images/userImages/')
            cb(null, pathfile);
        }
        else {
            pathfile = path.join(__dirname, '..', '/images/userImages/')
            console.log(pathfile)
            cb(null, pathfile);
        }
    },
    filename: (req, file, cb) => {
        console.log(req.params)
        cb(null, req.params.email + "." + file.mimetype.split('/')[1]);
    }
});
var upload = multer({storage: storage});
router.route('/login')
.post(controller.login);

router.route('/signup/:email')
.post(upload.single('photo'), controller.signup);

router.route('/permissions').get(controller.getPermissions);

router.route('/')
.get(controller.getAllUsers)
.delete(controller.deleteAllUsers)
.patch(controller.updateUser);

router.route('/:email')
.get(controller.checkEmailExists)
.delete(controller.deleteUser);



module.exports = router;