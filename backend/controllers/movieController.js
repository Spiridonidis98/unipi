const movie = require('../models/movie');

exports.createMovie = async (req,res) => {
    try {
        const newMovie = await movie.create(req.body);

        res.status(200).json({
            status: 'Movie created successfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: err
        });
    }
};

exports.getAllMovies = async (req,res) => {
    try {
        const movies = await movie.find();

        res.status(200).json({
            data : {
                movies
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'Could not find movies',
            message : err
        });
    }
};

exports.getMovieById = async (req,res) => {
    try {
        const movieFound = await movie.findOne({ id: req.params.id });
        console.log("getMovieById successful");
        if (movieFound) {
            res.status(200).json({
                data: {
                    movieFound
                }
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message : "movie not found"
            });
        }
    }
    catch (err) {
        res.status(404).json({
            status: 404,
            message : err
        });
    }
}

exports.getMoviesByType = async (req,res) => {
    try {
        const validation = movieTypeValidation(req.params.type); //validate type

        if (!validation.isValid) {
            return res.status(400).json({
                status: 400,
                message: validation.errorMessage //the error message from movieTypeValidation
            });
        }

        const movies = await movie.find({ type: req.params.type });
        if (movies) {                                    //if (movies.length > 0)  maybe
            console.log("getMoviesByType successful");

            res.status(200).json({
                data: {
                    movies
                }
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message : "movies not found"
            });
        }
    }
    catch (err) {
        res.status(404).json({
            status: 404,
            message : err
        });
    }
}


exports.updateMovieById = async (req,res) => {
    try {
        const movieFound = await movie.findByIdAndUpdate( req.params.id , req.body, {
            new: true //shows patched entry
        });
        console.log("updateMovieById successful");

        res.status(200).json({
            data: {
                movieFound 
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 404,
            message : err
        });
    }
}

exports.deleteMovieById = async (req,res) => {
    try {
        const movieFound = await movie.findByIdAndDelete(req.params.id);
        if (movieFound) {
            res.status(200).json({
                status: "movie with id : "+req.params.id+" deleted successfully",
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message : "movie not found"
            });
        }
    }
    catch (err) {
        res.status(404).json({
            status: 404,
            message : err
        });
    }
}

const movieTypeValidation = (type) => { 
    const allowedTypes = ['current', 'coming_soon']; //only allow these 'type' values

    if (!allowedTypes.includes(type)) {
        return {
            isValid: false,
            errorMessage: "Invalid 'type' parameter. Allowed values are 'current' and 'coming_soon'"
        };
    }
    return { isValid: true };
};