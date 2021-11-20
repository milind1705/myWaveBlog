const Blog =  require('../models/blog.model');
const User = require('../models/user.model')

module.exports.createBlog = async(req, res) =>{
    const {title, description, markDown} = req.body;
    const userId =  req.payload.id
    const user =await User.findOne({userId})

    const newBlog = new Blog({title, description, markDown});
    newBlog.save().then((data) => {
        return res.status(200).json({
            data:data,
            error:null,
            message: "The blog saved successfuly"
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
        let id = req.parmas.id;
        let userId = req.payload.id;
        let user =await User.findOne({userId})
        console.log(user)
        let blog =await Blog.findOne(id)
        if(user.id == blog.id){
            const updated = 
           await Blog.findByIdAndUpdate(id, req.body, {new:true})
            res.json({message: updated })
        }

    } catch(err) {
        res.json(err)
    }
}