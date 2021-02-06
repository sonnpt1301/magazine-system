import User from '../models/user.js'

export const getProfile = async (req, res) => {
    try {
        const { _id } = req.user
        const user = await User.findOne({ _id })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}