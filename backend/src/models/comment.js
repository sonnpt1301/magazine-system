import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId, ref: 'User',
    },
    contributionId: {
        type: mongoose.Schema.ObjectId, ref: 'Contribution',
    },
    content: String
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
export default Comment

