
const Journal = require('../models/journals');

module.exports.index = async(req, res)=>{
    const today = (new Date()).toISOString().split('T')[0];
    let journals;
    try{
        journals = await Journal.find({date: today});
        res.render('index', {journals, date: (new Date()).toLocaleString('en-US', {year: 'numeric', day: 'numeric', month: 'short'})});
    }
    catch{
        journals = [];
    }
}