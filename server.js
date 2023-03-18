

    require('dotenv').config();


const path = require('path');
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');

app.use(expressLayout);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (e)=>{console.log(e)});
db.once('open', ()=>console.log("Connected"));

const indexRouter = require('./routes/index.js');
const journalRouter = require('./routes/journals.js');

app.use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/journals', journalRouter);

app.listen(process.env.PORT || 3000);

