const Blog =  require('../models/blog.model');
const User = require('../models/user.model')

module.exports.createBlog = async(req, res) =>{
   try{
    const {title, description, markDown} = req.body;
    const userid =  req.payload._id
    const user =await User.findById(userid)
    const userId = user.id
    console.log(user)
    const newBlog = new Blog({title, description, markDown, userId});
    newBlog.save().then((data) => {
        return res.status(200).json({
            data:data,
            error:null,
            message: "The blog saved successfuly"
        })
    })
   }
    catch(err)  {
        return res.status(400).json({
            data:null,
            error:err.message,
            message:"Something went wrong"
        })
    }
}

module.exports.getBlog = (req,res) => {
    Blog.find({}).then((data) =>{
        return res.status(200).json({
            data:data,
            error:null,
            message:"Data fetched successfuly"
        })
    })
    .catch((err) => {
        return res.status(400).json({
            data:null,
            error:err.message,
            message:"Something went wrong"
        })
    })
}

module.exports.getBlogById = (req,res) => {
    Blog.find({_id:req.params.id}).then((data) =>{
        return res.status(200).json({
            data:data,
            error:null,
            message:"Data fetched successfuly"
        })
    })
    .catch((err) => {
        return res.status(400).json({
            data:null,
            error:err.message,
            message:"Something went wrong"
        })
    })
}

module.exports.update =async (req,res) => {
    
    try{
        const userid =  req.payload._id
    const user =await User.findById(userid)
    const userId = user.id
    let id = req.params.id;
    let blog =await Blog.findById(id)
    if(blog.userId == userId){
       const updated =await Blog.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({updated})
    } else {
        res.status(401).json({message: "You are Unauthorized"})
    }

    } catch(err) {
        res.status(400).json({
            data:null,
            error:err.message,
            message:"Something went wrong"
        })
    }
}

module.exports.deleteBolg =async (req,res) => {
    
    try{
        const userid =  req.payload._id
    const user =await User.findById(userid)
    const userId = user.id
    let id = req.params.id;
    let blog =await Blog.findById(id)
    if(blog.userId == userId){
       const updated =await Blog.findByIdAndDelete(id)
        res.status(200).json({
            message:"Blog successfully deleted"
        })
        
    }
    else {
        res.status(401).json({message: "You are Unauthorized"})
    }

    } catch(err) {
        res.status(400).json({
            data:null,
            error:err.message,
            message:"Something went wrong"
        })
    }
}