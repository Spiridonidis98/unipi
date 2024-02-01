const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');

const app = express ();
app.use(express.json());
app.use(express.static(__dirname + '/images'));
var multer  = require('multer');
/*files*/
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body)
        if(req.url.includes('/api/v1/movie')) {
            cb(null,__dirname + '/images/movieImages');
        }
        else {
            cb(null,__dirname +'/images/movieImages');
        }
    },
    filename: (req, file, cb) => {
        console.log(req.body)

        console.log(file);
        var filetype = '';
        if(file.mimetype === 'image/png') {
        filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
        }
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

router.route('/')
.get(controller.getMovies)
.post(upload.single('file'), controller.addMovie);

// router.post('/upload', );

// app.post('/upload', upload.single('upload')).post(controller.uploadImage)

module.exports = router;
