const express = require('express');
const router = express.Router();
const movieController = require(`${__dirname}/../controllers/movieController`);

router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie)

router.route(':lang/:id')
    .get(movieController.getMovieById)
    .patch(movieController.updateMovieById)
    .delete(movieController.deleteMovieById)

router.route(':lang/:type')
    .get(movieController.getMoviesByType)

module.exports = router;