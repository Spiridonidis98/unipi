const contact = require('../models/contact');
path = require('path');

exports.getContacts = async (req, res) => {
    try {
        let contactsFound = await contact.find();
        return res.status(200).json({
            data: contactsFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.getContactById = async (req, res) => {
    try {
        const contactFound = await contact.findById(req.params._id);
        return res.status(200).json({
            data: contactFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.getContactsBySurname = async (req, res) => {
    try {
        const contactsFound = await contact.find({surname : req.params.surname});
        return res.status(200).json({
            data: contactsFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.getContactsByEmail = async (req, res) => {
    try {
        const contactsFound = await contact.find({email : req.params.email});
        return res.status(200).json({
            data: contactsFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.addContact = async (req, res) => {
    const _id = req.body._id; // id of the contact entry itself
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const message = req.body.message;

    if(!name || !surname || !email || !message) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for name, surname, email, message'
        });
    }
    else {
        //create new contact
        try{
            const newContact = new contact({
                name: name,
                surname : surname,
                email: email,
                message: message,
                create_dt: formatDate(new Date()),
            });
            await newContact.save();
            return res.status(200).json({
                data: newContact,
                status: 200,
                msg: 'contact created'
            });
        } catch( error ) {
            return res.status(500).json({
                status: 500,
                dmsg: 'Insert failed',
                msg: 'Interval Server error',
                data: JSON.stringify(error, null, '\t')
            });
        }
    }
}

//delete all contacts
exports.deleteContacts = async (req, res) => {
    try {
        const contactsFound = await contact.deleteMany();
        if (contactsFound.deletedCount > 0) {
            return res.status(200).json({
                msg: 'contacts deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'contacts not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'contacts delete error',
            status: 500
        });
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const contactFound = await contact.findByIdAndDelete(req.params._id);

        if (contactFound) {
            return res.status(200).json({
                msg: 'contact deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'contact not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'contact delete error',
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