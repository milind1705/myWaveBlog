const User = require('../models/user.model');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.signup = (req, res) =>{
    const {name, email, password } = req.body;
    if(!name || !email ||!password){
        return res.status(400).json({
            data:null,
            message:"All fields are mandetory"
        })
    }
    User.findOne({email:email}).then((user) =>{
        if(user){
            return res.status(400).json({
                data:null,
                message:"This email is alredy registered with us."
            })
        }
        //create the hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {

                //save the new user
                const newUser  =  new User({name: name, email:email, password:hash});
                newUser.save().then((user) => {
                    return res.status(200).json({
                        data: user,
                        error: null,
                        message:"User saved Successfuly. Please Login"
                    })
                })
            })
        })
    })
    .catch((err) => {
        return res.status(400).json({
            data: null,
            error: err.message,
            message:"something went wrong while creating user."
        })
    })
}

 module.exports.login = (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "All fields are mandetory"
        })
    }
    User.findOne({email:email}).then((user) => {
        if(!user){
            return res.status(400).json({
                message: "User is not registered with us"
            })
        }

        //validating passsword
        bcrypt.compare(password, user.password).then((isMatch) => {
            if(!isMatch){
                return res.status(400).json({
                    message: "Invalid password"
                })
            }
        //assign token
           
        jwt.sign({_id:user.id}, process.env.JWT_KEY, {expiresIn:3600}, (err,token) =>{
            res.cookie("access_token", token)
            return res.status(200).json({
                token:token,
                user:{email: user.email, name: user.name},
                message:"login successful"
            });
        } );
        })
    })
    .catch((err) => {
        return res.status(400).json({
            data: null,
            error: err.message,
            message:"something went wrong while Login."
        })
     })
 }