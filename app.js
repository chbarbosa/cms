const express = require('express');
const app = express();
const path = require('path');
const exphds = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/cms')
    .then(db=>console.log('DB connected'))
    .catch(err=>console.log(err));

app.use(express.static(path.join(__dirname, 'public')));

const {select} = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphds({defaultLayout: 'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');

//Upload middleware

app.use(upload());

//Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method override

app.use(methodOverride('_method'));

app.use(session({
    secret: 'chbarbosa2018',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Routes

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(4500, ()=>{
    console.log(`Listening on port 4500`);
});