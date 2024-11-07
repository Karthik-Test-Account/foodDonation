// controllers/mainController.js

exports.home = (req, res) => {
    res.render('home', { title: 'Home - Hunger-Free' });
};

exports.about = (req, res) => {
    res.render('about', { title: 'About Us - Hunger-Free' });
};

exports.team = (req, res) => {
    res.render('team', { title: 'Our Team - Hunger-Free' });
};

exports.projects = (req, res) => {
    res.render('projects', { title: 'Projects - Hunger-Free' });
};

exports.resources = (req, res) => {
    res.render('resources', { title: 'Resources - Hunger-Free' });
};

exports.donation=(req,res)=>{
    res.render('donation',{ title : 'Donation - Hunger-Free'})
}