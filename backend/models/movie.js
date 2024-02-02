const mongoose = require('mongoose');

const Movie = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    name_lower: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    directors: {
        type: String,
        required: true
    },
    writers: {
        type: String,
        required: true,
    },
    actors: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    start_dt_from: {
        type: String,
    },
    create_dt: {
        type: String,
        default: null
    },
    update_dt: {
        type: String,
        default: null
    },
    imageName: {
        type: String,
        required: true,
    },
    inactive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Movie', Movie);

// /*files*/
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './public/images');
//     },
//     filename: (req, file, cb) => {
//       console.log(file);
//       var filetype = '';
//       if(file.mimetype === 'image/gif') {
//         filetype = 'gif';
//       }
//       if(file.mimetype === 'image/png') {
//         filetype = 'png';
//       }
//       if(file.mimetype === 'image/jpeg') {
//         filetype = 'jpg';
//       }
//       cb(null, file.originalname);
//     }
// });
// var upload = multer({storage: storage});

// app.post('/upload',upload.single('file'),function(req, res, next) {
//   console.log(req.file);
//   if(!req.file) {
//     res.status(500);
//     return next(err);
//   }
//   res.json({ fileUrl: 'http://127.0.0.1:3000/images/' + req.file.filename });
// })

// app.use('/images',express.static("public/images"));