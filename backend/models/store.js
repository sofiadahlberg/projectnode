/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/

const mongoose = require('mongoose')

//Mongooseschema för store
const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
},
    storeLocation: {
        type: String,
        required: true
},
    storeZipcode: {
        type: String,
        required: true
},
    storeCity:{
        type: String,
        required: true
},
    storeEmail:{
        type: String,
        required: true
},
    storeNumber: {
        type: String,
        required: true
}
    });


    module.exports = mongoose.model('Store', storeSchema)