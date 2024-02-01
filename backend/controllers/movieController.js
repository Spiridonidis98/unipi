const movie = require('../models/movie');

exports.getMovies = async (req, res) => {
    try {
        return res.status(200).json({
            data: await movie.find({inactive: false})
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.addMovie = async (req, res) => {
    const {name, description, directors, writers, actors, category, duration, rating, imageName, inactive} = req.body;
    if(!name || !description || !directors || !writers || !actors || !category || !duration || !rating || !imageName) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for name, description, directors, writers, actors, category, duration, rating, imageName'
        });
    }
    else {
        //if we find movie with the same title we update it
        const movieFound = await movie.findOne({name_lower: name.toLocaleLowerCase()})
        if(movieFound) {
            try {
                await movie.findOneAndUpdate({
                    name: name,
                    name_lower: movieFound.name_lower,
                    rating: rating,
                    description: description,
                    directors: directors,
                    writers: writers,
                    actors: actors,
                    category: category,
                    duration: duration,
                    imageName: imageName,
                    inactive: inactive ? inactive : false,
                    create_dt: movieFound.create_dt,
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
                    imageName: imageName,
                    inactive: inactive ? inactive : false,
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

exports.send = async (req, res) => {}

function formatDate(date) {
    let day = new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate();
    let month = new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    let hour = new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours();
    let minutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
    let milliseconds = new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getMilliseconds();

    return `${year}-${month}-${day} ${hour}:${minutes}:${milliseconds}`;
}