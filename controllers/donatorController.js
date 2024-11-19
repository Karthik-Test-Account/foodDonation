const userModel = require('../models/userModel');

const submitDonationController = async (req, res) => {
    try {
        const { name, phone, email, foodType, quantity, pickupLocation, assurity } = req.body;
        console.log("from  donation controller:",req.body);
        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.render('all-donations',{
                success:false,
                message:'User not registered, so cannot donate',
            });
        }
        
        // Check if name and phone match the user's info
        if (name !== user.name || phone !== user.phone) {
            return res.render("all-donations",{
                success:false,
                message:'Invalid Credentials',
            });
        }

        // Create new donation object
        const newDonation = { foodType, quantity, pickupLocation, assurity };

        // Add donation to user's donations array
        user.donations.push(newDonation);

        // Save updated user record
        await user.save();
        console.log("Donation saved successfully.");

        res.render('all-donations',{
            success:true,
            message:'Donation saved successfully',
            user
        })
    } catch (error) {
        console.error("Error saving donation:", error);
        res.render('all-donations',{
            success:false,
            message:'Something went wrong'
        });
    }
};

module.exports = { submitDonationController };
