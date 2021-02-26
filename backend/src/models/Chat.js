import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema)
export default Chat
