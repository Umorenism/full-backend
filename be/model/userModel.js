const mongoose = require('mongoose');
const { userAgentFromString } = require('next/server');


const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"please add user name"]
    },
    email:{
        type:String,
        required:[true,"please add user name"],
        unique:[true,"email addres taken"]
    },
    password:{
        type:String,
        required:[true,"please add user password"],
        unique:[true,"email addres taken"]
    },  
},
{
    timestamps:true,
}

);
module.exports=mongoose.model("User",userSchema)