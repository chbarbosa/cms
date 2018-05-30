const express = require('express');
const app = express();
const path = require('path');
const exphds = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/cms')
    .then(db=>console.log('DB connected'))
    .catch(err=>console.log(err));

app.use(express.static(path.join(__dirname, 'public')));

const {select} = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphds({defaultLayout: 'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method override

app.use(methodOverride('_method'));

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