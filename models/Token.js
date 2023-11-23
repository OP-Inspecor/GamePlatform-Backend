const {Schema,model} = require('mongoose');

const TokenSchema = new Schema({
    refreshToken:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },    
},{timestamps:true});

module.exports = model("Token",TokenSchema);