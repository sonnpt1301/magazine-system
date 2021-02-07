import mongoose from 'mongoose'

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: true,
        unique: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Faculty = mongoose.model('Faculty', facultySchema)
export default Faculty