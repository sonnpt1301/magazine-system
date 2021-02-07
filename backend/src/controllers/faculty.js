import Faculty from '../models/faculty.js'

export const getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find({ is_deleted: { $ne: true } })
        res.status(200).json({ faculty })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const createFaculty = async (req, res) => {
    try {
        console.log(req.body)
        const newFaculty = new Faculty({
            name: req.body.name
        });
        const faculty = await newFaculty.save()
        res.status(201).json({ faculty })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

export const updateFaculty = async (req, res) => {
    try {
        const id = req.params.id;
        const faculty = await Faculty.findOneAndUpdate({ _id: id }, {
            name: req.body.name,
        }, { new: true })
        res.status(200).json({ faculty })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteFaculty = async (req, res) => {
    try {
        const id = req.params.id;
        const faculty = await Faculty.findOneAndUpdate({ _id: id }, {
            is_deleted: true
        }, { new: true })
        res.status(200).json({ faculty, message: 'Delete Faculty Successfully!!!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}