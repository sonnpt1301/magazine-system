import User from '../models/user.js'
import shortid from 'shortid'

export const getUsers = async (req, res) => {
    try {
        const user = await User.find({ is_deleted: { $ne: true } })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOneAndUpdate({ _id: id }, {
            $set: {
                ...req.body
            }
        }, { new: true })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOneAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
                email: `deleted${shortid()}@deleted.deleted`
            }
        }, { new: true })
        res.status(200).json({ user, message: 'Delete successfully' })
    } catch (error) {
        console.log(error)
    }
}