const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditoriumController');
path = require('path');

const app = express ();
app.use(express.json());
app.use(express.static(__dirname + '/images/auditoriumsImages'));
var multer  = require('multer');
/*files*/
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.url.includes('/api/v1/auditorium')) {
            pathfile = path.join(__dirname, '..', '/images/auditoriumsImages/')
            console.log(pathfile)

            cb(null, pathfile);
        }
        else {
            pathfile = path.join(__dirname, '..', '/images/auditoriumsImages/')
            console.log(pathfile)
            cb(null, pathfile);
        }
    },
    filename: (req, file, cb) => {
        console.log(req.body)
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

router.route('/')
.get(controller.getAuditoriums)
.delete(controller.deleteAuditoriums);

router.route('/:code')
.delete(controller.deleteAuditorium);


//addAuditorium works both as post and patch
router.route('/').post(upload.single('file'),controller.addAuditorium);


module.exports = router;
