/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/

const mongoose = require('mongoose');

//Mongooseschema för Order
const orderSchema = new mongoose.Schema({
   
    category:
    {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    storeNameOrder: {
        type: String,
    required: true
},
price: {
    type: String,
required: true
}
});
module.exports = mongoose.model('Order', orderSchema)