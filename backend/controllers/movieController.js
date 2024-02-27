const movie = require('../models/movie');
path = require('path');
exports.getMovies = async (req, res) => {
    try {
        let filter={}
        const {inactive} = req.query;
        if(inactive) {
            filter.inactive = inactive;
        }
        let moviesFound = await movie.find(filter);
        return res.status(200).json({
            data: moviesFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.patchMovie = async (req, res) => {
    const {_id, name, description, directors, writers, actors, category, duration, rating, inactive, start_dt_from} = req.body;
    if(!_id || !name || !description || !directors || !writers || !actors || !category || !duration || !rating) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for name, description, directors, writers, actors, category, duration, rating, imageName, start_dt_from'
        });
    }
    else {
        //if we find movie with the same title we update _id
        if(_id) {
            try {
                await movie.findOneAndUpdate({_id: _id},{
                    name: name,
                    name_lower: name.toLocaleLowerCase(),
                    rating: rating,
                    description: description,
                    directors: directors,
                    writers: writers,
                    actors: actors,
                    category: category,
                    duration: duration,
                    inactive: inactive ? inactive : false,
                    start_dt_from: start_dt_from ? formatDate(new Date(start_dt_from)) : formatDate(new Date()),
                    update_dt: formatDate(new Date())
                });
                return res.status(200).json({
                    status: 200,
                    msg: 'Update completed'
                })
            }catch( error ) {
                return res.status(500).json({
                    status: 500,
                    dmsg: 'Update failed',
                    msg: 'Interval Server error',
                    data: JSON.stringify(error, null, '\t')
                });
            }
        }
    }
}

exports.addMovie = async (req, res) => {
    const {_id, name, description, directors, writers, actors, category, duration, rating, imageName, inactive, start_dt_from} = JSON.parse(req.body.data);
    //console.log(JSON.parse(req.body.data))
    if(!name || !description || !directors || !writers || !actors || !category || !duration || !rating || !imageName) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for name, description, directors, writers, actors, category, duration, rating, imageName, start_dt_from'
        });
    }
    else {
        //if we find movie with the same _id we update it
        if(_id) {
            const movieFound = await movie.findById(_id)
            //console.log(movieFound)
            try {
                await movie.findOneAndUpdate({_id: _id}, {

                    name: name,
                    name_lower: movieFound.name_lower,
                    rating: rating,
                    description: description,
                    directors: directors,
                    writers: writers,
                    actors: actors,
                    category: category,
                    duration: duration,
                    imageName: '/images/moviesImages/' + imageName,
                    inactive: inactive ? inactive : false,
                    create_dt:  formatDate(movieFound.create_dt),
                    start_dt_from: start_dt_from ? formatDate(new Date(start_dt_from)) : formatDate(new Date()),
                    update_dt: formatDate(new Date())
                });
                return res.status(200).json({
                    status: 200,
                    msg: 'Update completed'
                })
            }catch( error ) {
                return res.status(500).json({
                    status: 500,
                    dmsg: 'Update failed',
                    msg: 'Interval Server error',
                    data: JSON.stringify(error, null, '\t')
                });
            }

        }
        else {
            try{
                const newMovie = new movie({
                    name: name,
                    name_lower: name.toLocaleLowerCase(),
                    rating: rating,
                    description: description,
                    directors: directors,
                    writers: writers,
                    actors: actors,
                    category: category,
                    duration: duration,
                    imageName: '/images/moviesImages/' + imageName,
                    inactive: inactive ? inactive : false,
                    start_dt_from: start_dt_from ? formatDate(new Date(start_dt_from)) : formatDate(new Date()),
                    create_dt: formatDate(new Date()),
                    update_dt: formatDate(new Date())
                });
                await newMovie.save();
                return res.status(200).json({
                    data: await movie.findOne({name_lower: name.toLocaleLowerCase()}),
                    status: 200,
                    msg: 'Movie created'
                });
            }catch( error ) {
                return res.status(500).json({
                    status: 500,
                    dmsg: 'Insert failed',
                    msg: 'Interval Server error',
                    data: JSON.stringify(error, null, '\t')
                });
            }
            
        }
    }

}

exports.send = async (req, res) => {
    //console.log('im here')
}


exports.deleteMovies = async (req, res) => {
    try {
        await movie.deleteMany();
        return res.status(200).json({
            msg: 'Movies deleted successfully',
            status: 200
        });
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'Movies delete error',
            status: 500
        });
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const movieFound = await movie.findByIdAndDelete(req.params._id);

        if (movieFound) {
            return res.status(200).json({
                msg: 'movie deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'movie not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'movie delete error',
            status: 500
        });
    }
}


function formatDate(date) {
    let day = new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate();
    let month = new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    let hour = new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours();
    let minutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
    let milliseconds = new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getMilliseconds();

    return `${year}-${month}-${day} ${hour}:${minutes}:${milliseconds}`;
}