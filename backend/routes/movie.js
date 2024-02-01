const express = require('express');
const router = express.Router();
const movieController = require(`${__dirname}/../controllers/movieController`);

router.route('/movies')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie)

router.route('/movies/:lang/:id')
    .get(movieController.getMovieById)
    .patch(movieController.updateMovieById)
    .delete(movieController.deleteMovieById)

router.route('/movies/:lang/:type')
    .get(movieController.getMoviesByType)

module.exports = router;