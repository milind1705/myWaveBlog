require('dotenv').config();
const express = require ("express");
const mongoose =  require('mongoose');
const cookieParser = require('cookie-parser');
const port =   process.env.PORT || 5000
const app = express();

const userRouter =  require('./routes/user.routes')
const blogRouter = require('./routes/blog.routes')
//connection with database
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once('open', () =>{
    console.log("Connected with database")
})

app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//routing
app.use('/signup', (req, res) => {
    res.render('signup')
    
})
app.use('/login', (req, res) => {
    res.render('login')
})

app.use('/createBlog', (req, res) => {
    res.render('createBlog')
})
app.use('/', (req, res) => {
    res.send("Welcome to My Blog")
})


app.use('/user', userRouter)
app.use('/blog', blogRouter)
//listning
app.listen(port, () =>{
    console.log(`server is runnig on port ${port}`)
})

