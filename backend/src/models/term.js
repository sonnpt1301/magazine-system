import mongoose from 'mongoose'

const termSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const Term = mongoose.model('Term', termSchema)
export default Term