const mongoose = require('mongoose')
const ProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
     bio:{
        type:String
    },
    skills:{
        type:[String]
    },
    role:{
        type:String,
        required:true
    },
    githubusername:{
        type:String
    },
    social:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        }
    }

})
module.exports = Profile = mongoose.model('profile', ProfileSchema)