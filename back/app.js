const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const figlet = require('figlet');

//Database
const db = require('./config/database');

//Test db
db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err => console.log('Error:' + err))


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


figlet.text("G.Dream", function(err, data) {
    console.log(data)
});

app.get('/', (req, res) => res.send('INDEX'))

//Routes
const userRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles.js');
const commentsRoutes = require('./routes/comments.js');
const responsesRoutes = require('./routes/responses.js');
const likesRoutes = require('./routes/likes.js');
const dislikesRoutes = require('./routes/dislikes.js');
const responseLikeRoutes = require('./routes/responseLike.js');
const responseDislikeRoutes = require('./routes/responseDislike.js');
const commentLikeRoutes = require('./routes/commentLike.js');
const commentDislikeRoutes = require('./routes/commentDislike.js');



app.use('/users', userRoutes);
app.use('/articles', articlesRoutes);
app.use('/comments', commentsRoutes);
app.use('/responses', responsesRoutes);
app.use('/likes', likesRoutes);
app.use('/dislikes', dislikesRoutes);
app.use('/commentLike', commentLikeRoutes);
app.use('/commentDislike', commentDislikeRoutes);
app.use('/responseLike', responseLikeRoutes);
app.use('/responseDislike', responseDislikeRoutes);



module.exports = app;