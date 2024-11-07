const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    donations: [
        {
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
        }
    ]
}, { timestamps: true }); // Corrected spelling for timestamps

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;
