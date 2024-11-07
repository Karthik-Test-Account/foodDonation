const mongoose = require('mongoose');
const donatorSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    assurity: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Donator = mongoose.model('Donators', donatorSchema);
module.exports = {Donator,donatorSchema};