const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,unique: true ,
            minlength: [3, "Pet name must be at least three characters long"],
            required: [true, "Pet name is a required field"]
        },
        type: {
            type: String,
            minlength: [3, "Pet type must be at least three characters long"],
            required: [true, "Pet type is a required field"]
        },
        description: {
            type: String,
            minlength: [3, "Description must be at least three characters long"],
            required: [true, "Description is a required field"]
        },
        skill1: {
            type: String,
        },
        skill2: {
            type: String,
        },
        skill3: {
            type: String,
        },
        likes: {
            type: Number,
        },
        
    },{timestamps:true});
    
module.exports.Pet = mongoose.model('Pet', PetSchema);
PetSchema.plugin(uniqueValidator);