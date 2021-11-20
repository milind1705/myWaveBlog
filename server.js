require('dotenv').config();
const express = require ("express");
const mongoose =  require('mongoose');
const port =  5000
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

//routing
app.use('/user', userRouter)
app.use('/blog', blogRouter)
//listning
app.listen(port, () =>{
    console.log(`server is runnig on port ${port}`)
})

