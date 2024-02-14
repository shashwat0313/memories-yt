//model for posts

import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String], // array of strings
    selectedFile: String, // some image
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date, 
        default: new Date()
    }
})

const postmessage = mongoose.model('postmessage', postSchema);
export default postmessage;