const auditorium = require('../models/auditorium');
const movie = require('../models/movie');
const screening = require('../models/screening');

exports.getScreening = async (req, res) => {
    try {
        const {screening_dt, movie_id} = req.query;
        //console.log(req.params)
        let filter = {};
        if(movie_id) {
            filter.movie_id = movie_id ? movie_id : undefined;
        }
        // filter.screening_dt = screening_dt ? `{ "$regex": "/${formatDate(screening_dt, false)}/"}` : `{ "$regex": ${formatDate(new Date(), false)}}`
        filter.screening_dt = screening_dt ? new RegExp(formatDate(screening_dt, false), 'i') : new RegExp(formatDate(new Date(), false),  'i') 
        //console.log(filter)
        let screeningMovies = await screening.find(filter);

        let totalInfo = [];
        for ( let screening of screeningMovies) {
            let temp = {
                screening,
                movie: await movie.findById(screening.movie_id),
                auditoriumInfo: await auditorium.findById(screening.auditorium_id)
            }
            totalInfo.push(temp)
        }

        return res.status(200).json({
            status: 200,
            data: totalInfo
        });
    }catch(error) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: "Internal Server Error",
            status: 500
        });
    }   
}

exports.addScreening = async (req, res) => {
    try{
        const {movie_id, auditorium_id, screening_dt} = req.body

        if(!movie_id || !auditorium_id || !screening_dt ) {
            return res.status(400).json({
                msg: 'Required Data are missing. Check for movie_id, auditorium_id, screening_dt',
                status: 400
            });
        }
        else {
            const screen = new screening({
                movie_id: movie_id,
                auditorium_id: auditorium_id,
                screening_dt: screening_dt,
                inactive: false,
                create_dt: formatDate(new Date()),
                update_dt: formatDate(new Date())
            });

            const newScreen = await screen.save();

            return res.status(200).json({
                data: newScreen,
                msg: 'Screen created successfully',
                status: 200
            })
    
        }
    }catch( error ) {
        return res.status(500).json({
            status: 500,
            data: JSON.stringify(error, null, '\t')
        })
    }
    
}

function formatDate(date, andtime) {
    let day = new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate();
    let month = new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    let hour = new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours();
    let minutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
    let milliseconds = new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getMilliseconds();

    return andtime ? `${year}-${month}-${day} ${hour}:${minutes}:${milliseconds}`: `${year}-${month}-${day}`;
}