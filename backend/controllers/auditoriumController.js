const auditorium = require('../models/auditorium');
path = require('path');
exports.getAuditoriums = async (req, res) => {
    try {
        let auditoriumFound = await auditorium.find({inactive: false});
        return res.status(200).json({
            data: auditoriumFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.addAuditorium = async (req, res) => {
    const {code, rows, seats, moviesPlaying, imageName, inactive} = JSON.parse(req.body.data);
    //console.log(JSON.parse(req.body.data))
    if(!code || !rows || !seats || !imageName) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for code, rows, seats, imageName'
        });
    }
    else {
        //if we find auditorium with the same code we update it
        const auditoriumFound = await auditorium.findOne({code: req.body.code})
        if(auditoriumFound) {
            try {
                await auditorium.findOneAndUpdate({
                    code: code,
                    rows: rows,
                    seats: seats,
                    moviesPlaying: moviesPlaying,
                    imageName: '/images/auditoriumsImages/' + imageName,
                    inactive: inactive ? inactive : false,
                    create_dt:  formatDate(auditoriumFound.create_dt),
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
            //create new auditorium
            try{
                const newAuditorium = new auditorium({
                    code: code,
                    rows: rows,
                    seats: seats,
                    moviesPlaying: moviesPlaying,
                    imageName: '/images/auditoriumsImages/' + imageName,
                    inactive: inactive ? inactive : false,
                    create_dt: formatDate(new Date()),
                    update_dt: formatDate(new Date())
                });
                //console.log(moviesPlaying)
                await newAuditorium.save();
                return res.status(200).json({
                    data: await auditorium.findOne({code: code}),
                    status: 200,
                    msg: 'auditorium created'
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


exports.deleteAuditoriums = async (req, res) => {
    try {
        const AuditoriumsFound = await auditorium.deleteMany();
        if (AuditoriumsFound.deletedCount > 0) {
            return res.status(200).json({
                msg: 'auditoriums deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'auditoriums not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'auditoriums delete error',
            status: 500
        });
    }
}

exports.deleteAuditorium = async (req, res) => {
    try {
        const AuditoriumFound = await auditorium.deleteOne({code: req.params.code});
        if (AuditoriumFound.deletedCount > 0) {
            return res.status(200).json({
                msg: 'auditorium deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'auditorium not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'auditorium delete error',
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