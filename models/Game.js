const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{ 
        type:String, //permanent array of categories
        required:true
    },
    path:{
        type: String,
        //required:true
    },
    rating:{
        type:Number,
        default:0,
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    likes:{
        type:Number,
        default:0,
    },
    // history_players:{
    //     type:[{ type: Schema.Types.ObjectId,
    //         ref: 'User' }],
    // }
},{ versionKey: false, timestamps: true });

const Game = model("Game", gameSchema);
module.exports = Game;

