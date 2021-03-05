import User from '../models/user.js'
import shortid from 'shortid'

export const getUsers = async (req, res) => {
    try {
        const user = await User.find({ is_deleted: { $ne: true }, role: { $ne: 'admin' } })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const uploadAvatar = async (req, res) => {
    try {
        const { id } = req.params
        let profilePicture = []
        req.files.length && (profilePicture = req.files.map(({ location }) => ({ img: location })))
        const user = await User.findOneAndUpdate({ _id: id }, {
            $set: {
                ...req.body,
                profilePicture
            }
        }, { new: true })
        if (user) {
            res.status(200).json({ user, files: req.files })
        } else {
            res.status(400).json({ error })
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOneAndUpdate({ _id: id }, {
            $set: {
                ...req.body,
            }
        }, { new: true })
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(400).json({ error })
        }
    } catch (error) {
        console.log(error)
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