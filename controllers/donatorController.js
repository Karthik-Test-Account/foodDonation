const userModel = require('../models/userModel');
const url = require("url")

const submitDonationController = async (req, res) => {
    try {
        const { name, phone, email, foodType, quantity, pickupLocation, assurity } = req.body;
        console.log(req.body);
        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.redirect('/all-donations?success=false&message=User%20not%20registered%20so%20cannot%20donate');
        }
        
        // Check if name and phone match the user's info
        if (name !== user.name || phone !== user.phone) {
            return res.redirect("/all-donations?success=false&message=Invalid%20Credentials");
        }

        // Create new donation object
        const newDonation = { foodType, quantity, pickupLocation, assurity };

        // Add donation to user's donations array
        user.donations.push(newDonation);

        // Save updated user record
        await user.save();
        console.log("Donation saved successfully.");

        // Redirect to the all-donations page with a success message
        // res.redirect(`/all-donations?success=true&email=${email}`);

        res.redirect(url.format({
            pathname:"/all-donations",
            query:{
                success:true,
                email: email,
                user
            }
        }))
    } catch (error) {
        console.error("Error saving donation:", error);
        res.redirect('/all-donations?success=false&message=Something%20went%20wrong');
    }
};

module.exports = { submitDonationController };
