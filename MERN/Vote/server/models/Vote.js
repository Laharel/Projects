const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const VoteSchema = new mongoose.Schema(
    {
        question: {
            type: String,unique: true ,
            minlength: [10, "Question must be at least ten characters long"],
            required: [true, "Question is a required field"]
        },
        option1: {
            type: String,
            required: [true, "Option 1 is a required field"]
        },
        option2: {
            type: String,
            required: [true, "Option 2 is a required field"]
        },
        option3: {
            type: String,
        },
        option4: {
            type: String,
        },
        option1n:{
            type:Number,
            default:0
        },
        option2n:{
            type:Number,
            default:0
        },
        option3n:{
            type:Number,
            default:0
        },
        option4n:{
            type:Number,
            default:0
        },
        sum:{
            type:Number,
            default:0
        }
    },{timestamps:true});
    
module.exports.Vote = mongoose.model('Vote', VoteSchema);
VoteSchema.plugin(uniqueValidator);