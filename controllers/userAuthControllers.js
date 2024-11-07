const userModel = require('../models/userModel');
const jwt=require('jsonwebtoken')

const regsiterUserController = async (req, res) => {
    try {
        const { name, email, phone, dob } = req.body;

        // Check if all required fields are present
        if (!name) return res.render('user-details', { message: 'Name is missing' });
        if (!email) return res.render('user-details', { message: 'Email is missing' });
        if (!phone) return res.render('user-details', { message: 'Contact No is missing' });
        if (!dob) return res.render('user-details', { message: 'DOB is missing' });

        // Calculate age based on DOB
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Check if the user is at least 18 years old
        if (age < 18) {
            return res.render('user-details', { message: 'Sorry! You aren\'t old enough to register.' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.render('user-details', { message: 'User Already Exists' });
        }

        // Create a new user if age is valid and user doesn't already exist
        const user = await new userModel({ name, email, phone, dob }).save();
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.render('user-details', { message: 'Error creating User' });
    }
}

module.exports = { regsiterUserController };
