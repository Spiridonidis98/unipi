const mongoose = require('mongoose');
const uri = "mongodb+srv://spiridonstel:AbJoE3oehpNcTAwg@cluster0.qml7elk.mongodb.net/?retryWrites=true&w=majority";
module.exports = {
    database(){
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        try {
            mongoose.connect(uri, connectionParams).then(() => {
                //console.log('Database connection successful');
            });
        }catch( error ) {
            //console.log('Database connection successful');
            //console.log(error)
        }
    }
}
