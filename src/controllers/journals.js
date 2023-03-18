
const Journal = require('../models/journals');

module.exports.posts = async (req, res) => {
    const search = { title: req.query.title, date: req.query.date };
    let query = Journal.find({});
    if (req.query.title) {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if (req.query.date) {
        query = query.where('date').equals(req.query.date);
    }
    try {
        const journals = await query.sort({date: -1}).exec();

        res.render('journals/index', { search, journals});
    }
    catch {
        res.status(500);
        res.render('journals/index', {search, journals: [], errorMessage: "Can't Find!"});
    }
}

module.exports.new = (req, res) => {
    res.render('journals/new', { journal: new Journal });
}

module.exports.create = async (req, res) => {
    const { title, post } = req.body;
    const newJournal = new Journal({
        title,
        post
    });
    try {
        await newJournal.save();
        res.redirect('/journals');
    }
    catch {
        res.render('journals/new', { journal: newJournal, errorMessage: "Can't Post" });
    }
}

module.exports.show = async(req, res)=>{
    const id = req.params.id;
    try{
        const journal = await Journal.findById(id);
        res.render('journals/show', {journal, url: `/journals/${id}`});
    }
    catch{
        res.redirect('/journals');
    }
    
}

module.exports.edit = async(req, res)=>{
    const id = req.params.id;
    try{
        const journal = await Journal.findById(id);
        res.render('journals/edit', {journal});
    }
    catch{
        res.redirect(`/journals/${id}`);
    }

}

module.exports.update = async(req, res)=>{
    const id = req.params.id;
    const {title, post} = req.body;
    let journal;
    try{
        journal = await Journal.findById(id);

        if(title === '' || post === ''){
            throw new Error('Title and post cannot be empty');
        }
        journal.title = title;
        journal.post = post;
        await journal.save()
        
        res.render(`journals/show`, {journal, url: `/journals/${id}`});
    }
    catch(e){
        res.render('journals/edit', {journal, errorMessage: e.message});
    }
}

module.exports.delete = async(req, res)=>{
    const id = req.params.id;
    let journal;
    try{
        journal = await Journal.findById(id);
        await journal.remove()
        res.redirect('/journals');
    }
    catch{
        if(!journal){
            res.redirect('/');
        }
        res.render(`journals/${id}`, {journal});
    }
}