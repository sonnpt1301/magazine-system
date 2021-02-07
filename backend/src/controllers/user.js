import User from '../models/user.js'

export const getUsers = async (req, res) => {
    try {
        const user = await User.find({ is_deleted: { $ne: true } })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}