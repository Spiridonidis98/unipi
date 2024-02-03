const user = require('../models/user');
fs = require('fs')
path = require('path');

exports.login = async (req, res) => {
    const {email, password} = req.body;
    //console.log(email)
    //checking if required data is missing
    if(!email || !password) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for email, password'
        });
    }
    else {
        try {
            const filter = {email, password};
            let userFound = await user.findOne(filter);
            if(!userFound.facebookId && !userFound.googleId) {
                fixUserPhoto([userFound]);
            }
            if(userFound) {
                return res.status(200).json({
                    status: 200,
                    msg: 'User found',
                    data: userFound
                });
            }
            else {
                return res.status(404).json({
                    status: 404,
                    msg: 'Unable to found user with given credentials'
                });
            }
        }catch( error ) {
            return res.status(500).json({
                status: 500,
                msg: 'Internal Server error',
                data: JSON.stringify(error, null, '\t')
            })
        }
    }
};

exports.getAllUsers = async (req, res) => {
    let users = await user.find();
    fixUserPhoto(users);

    return res.status(200).json({
        data: users
    })
}

exports.checkEmailExists = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            data: await checkIfUserExists(req.params.email.toString().toLocaleLowerCase())
        })
    }catch( error ) {
        return res.status(500).json({
            status: 500,
            msg: 'Internal server error',
            data: JSON.stringify(error, null, '\t')
        });
    }
}

exports.deleteAllUsers = async(req, res) => {
    await user.deleteMany();
    return res.status(200).json({
        msg: 'All deleted'
    })
}

exports.deleteUser = async (req, res) => {
    try {
        if(await checkIfUserExists(req.params.email.toString().toLocaleLowerCase()) > 0) {
            //console.log(await checkIfUserExists(req.params.email.toString().toLocaleLowerCase()))
            const filter = {'email': req.params.email.toString().toLocaleLowerCase()};
            const deletedUser = await user.findOneAndDelete(filter);
            //console.log(deletedUser)
            if(deletedUser) {
                return res.status(200).json({
                    status: 200,
                    msg: 'User deleted successfully',
                    data: deletedUser.email
                });
            }
            else {
                return res.status(404).json({
                    status: 404,
                    msg: 'Unable to find user with email ' +  req.params.email
                });
            }
        }
        else {
            return res.status(404).json({
                status: 404,
                msg: 'Unable to find user with email ' + req.params.email
            });
        }

    }catch( error ){
        return res.status(500).json({
            status: 500,
            msg: 'Internal server error',
            data: JSON.stringify(error, null, '\t')
        })
    }
    
}

exports.signup = async (req, res) => {
    const {name, lastname, email, phone, password, roles, type, googleId, facebookId, photo} = JSON.parse(req.body.data);
    //Checking if we have all the required data
    if(!name || !lastname || !email || !password || !roles || !type) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for email, password, name, lastname, phone, type, roles'
        });
    }
    else {
        //Checking if email already exists
        if(await checkIfUserExists(email.toString().toLocaleLowerCase()).length > 0) {
            return res.status(400).json({
                status: 400,
                msg: 'User with the same email already exists.'
            });
        }
        else {
            const userCreated = new user({
                'name': name,
                'lastname': lastname,
                'email': email.toString().toLocaleLowerCase(),
                'phone': phone,
                'password': password,
                'roles': roles,
                'type': Number(type),
                'create_dt': formatDate(new Date()),
                'update_dt': formatDate(new Date()),
                'googleId': googleId ? googleId : null,
                'facebookId': facebookId ? facebookId : null,
                'photo': photo
            });

            try {
                await userCreated.save();
                const returnUser = await user.findOne({'email': email.toString().toLocaleLowerCase()});
                return res.status(200).json({
                    status: 200,
                    msg: 'User created successfully',
                    data: returnUser
                });
            }catch(error) {
                return res.status(500).json({
                    status: 500,
                    msg: 'Internal Server Error',
                    data: JSON.stringify(error, null, '\t')
                });
            }

        }
    }
}

async function checkIfUserExists(email) {
    const users = await user.find({'email': email});
    return users.length;
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

function fixUserPhoto(users) {
    let pathFile = path.join(__dirname, '..', '/images/userImages/')
    var list = fs.readdirSync(pathFile)
    for(let user of users) {
        if(!user.facebookId && !user.googleId) {
            for(let item of list) {
                console.log(item)
                if(item.includes(user.email)) {
                    user.photo = 'http://127.0.0.1:8080/images/userImages/' + item
                }
            }
            
        }
    }
}