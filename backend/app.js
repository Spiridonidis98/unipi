const database = require('./database.js');
const express = require('express');
const userRoute = require('./routes/user.js')
const movieRoute = require('./routes/movie.js')
const auditoriumRoute = require('./routes/auditorium.js')
const reservationRoute = require('./routes/reservation.js')
const contactRoute = require('./routes/contact.js')
const screeningRoute = require('./routes/screening.js');

database.database();
const app = express ();
app.use(express.json());
app.use('/images/moviesImages',express.static("images/moviesImages"));
app.use('/images/auditoriumsImages',express.static("images/auditoriumsImages"));
app.use('/images/userImages',express.static("images/userImages"));



app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/user',userRoute);
app.use('/api/v1/movie',movieRoute);
app.use('/api/v1/auditorium',auditoriumRoute);
app.use('/api/v1/reservation',reservationRoute);
app.use('/api/v1/contact',contactRoute);
app.use('/api/v1/screening',screeningRoute);

app.listen(8080 , () => {
    console.log('Server listens to port 8080')
});