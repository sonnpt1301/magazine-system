import Term from '../models/term.js'


export const getClosureDate = async (req, res) => {
    try {
        const closureDates = await Term.find({})
        if (closureDates) {
            res.status(200).json({ closureDates })
        } else {
            res.status(400).json({ error })
        }
    } catch (error) {
        console.log(error)
    }
}

export const addClosureDate = async (req, res) => {
    try {
        const { topic, description, startDate, endDate } = req.body
        const newClosureDate = new Term({
            topic,
            description,
            startDate,
            endDate
        })
        const closureDate = await newClosureDate.save()
        if (closureDate) {
            res.status(201).json({ closureDate })
        } else {
            res.status(400).json({ error })
        }
    } catch (error) {
        console.log(error)
    }
}

export const editClosureDate = async (req, res) => {
    try {
        const { _id } = req.params
        const update = await Term.findOneAndUpdate({ _id }, {
            $set: {
                ...req.body
            }
        }, { new: true })
        const closureDate = await Term.findOne({_id: update._id})
        res.status(200).json({ closureDate })
    } catch (error) {
        console.log(error)
    }
}