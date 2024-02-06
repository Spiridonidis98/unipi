const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');
path = require('path');

const app = express ();
app.use(express.json());
app.use(express.static(__dirname + '/images/moviesImages'));
var multer  = require('multer');
/*files*/
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.url.includes('/api/v1/movie')) {
            pathfile = path.join(__dirname, '..', '/images/moviesImages/')
            //console.log(pathfile)

            cb(null, pathfile);
        }
        else {
            pathfile = path.join(__dirname, '..', '/images/moviesImages/')
            //console.log(pathfile)
            cb(null, pathfile);
        }
    },
    filename: (req, file, cb) => {
        //console.log(req.body)
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

router.route('/')
.get(controller.getMovies)
.delete(controller.deleteMovies)

router.route('/upload').patch(controller.patchMovie);


router.route('/').post(upload.single('file'),controller.addMovie);


module.exports = router;
