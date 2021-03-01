import mongoose from 'mongoose'

const contributionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    filesUpload: [
        { filePath: String, fileName: String }
    ],
    contributionImage: [
        { img: { type: String } }
    ],
    facultyId: {
        type: mongoose.Schema.ObjectId, ref: 'Faculty',
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId, ref: 'User',
        required: true
    },
    termId: {
        type: mongoose.Schema.ObjectId, ref: 'Term',
        required: true
    },
    is_public: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Contribution = mongoose.model('Contribution', contributionSchema)
export default Contribution