const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid');

mongoose.set('useFindAndModify', false);
/**
 * author - ref to user
 * color - optional to use in view, has default
 * image - optional
 * content - required
 * time - timestamp indicates when saved to DB, default value-now
 * comments - dynamic comments counter
 */
const todoSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:[true, "content is required"]
    },
    check:{
        type:Boolean,
        default:false,
    },
    date:{
        type:Date,
        default: Date.now,
    },
});



/**
 * method to find by date
 */
// todoSchema.Methods.getByDate = async function(date){
//     try{
//         return Post.
//             findOne({time:date})
//     }
//     catch(err){
//         return;
//     }
// }
/**
 * plugin to remove all comments if post is removed
 */
module.exports = new mongoose.model('Todo',todoSchema);