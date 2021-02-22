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
    facultyId: {
        type: mongoose.Schema.ObjectId, ref: 'Faculty',
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId, ref: 'User'
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