const express = require('express');
const app = express();
const path = require('path');
const exphds = require('express-handlebars')

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphds({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{

    res.render('home/index');

});
app.get('/about', (req, res)=>{

    res.render('home/about');

});

app.listen(4500, ()=>{
    console.log(`Listening on port 4500`);
});