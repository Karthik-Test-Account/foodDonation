const express=require('express');
const router=express.Router();
const mainController=require('../controllers/mainController');
const { regsiterUserController } = require('../controllers/userAuthControllers');
const { submitDonationController } = require('../controllers/donatorController');
const userModel=require('../models/userModel')

router.get('/',mainController.home);
router.get('/about', mainController.about);
router.get('/team', mainController.team);
router.get('/projects', mainController.projects);
router.get('/resources', mainController.resources);
router.get('/learn-more', (req, res) => res.render('learn-more'));
router.get('/user-details',(req,res)=>res.render('user-details'));
router.get('/donation',mainController.donation)
router.post('/register',regsiterUserController)
router.post('/submit-donation',submitDonationController)

router.get('/all-donations',async(req,res)=>{
    try {
        const { success, message } = req.query;

        // Retrieve user donations if success is true
        if (success === 'true') {
            const user = await userModel.findOne({ email: req.query.email }).populate('donations');
            console.log("from all-nations",user);
            
            return res.render('all-donations', { success: true, user, message: "Donation added successfully!" });
        } else {
            // Render failure message or error
            return res.render('all-donations', { success: false, message });
        }
    } catch (error) {
        console.error(error);
        res.render('all-donations', { success: false, message: 'Error loading donations.' });
    }
})
module.exports=router;