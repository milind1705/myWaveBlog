const mongoose = require('mongoose');

const blogSchema  = mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,
        required:true,
        trim: true
    },
    description:{
        type:String,
       
    },
    markDown:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
});
module.exports = mongoose.model("Blog", blogSchema);