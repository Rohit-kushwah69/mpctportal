const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    image: {
        public_id: {
            type: String,
            require
        },
        url: {
            type: String,
            require
        },
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        default:"student"
    },
    is_verify:{
        type:String,
        default:0
      },
}, { timestamps: true })
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel