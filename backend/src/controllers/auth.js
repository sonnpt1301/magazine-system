import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: 'User already existed' })
        }
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            address: req.body.address,
            city: req.body.city,
            description: req.body.description,
            contact: req.body.contact,
            facultyId: req.body.facultyId
        }
        newUser.hash_password = await bcrypt.hash(req.body.password, 10)
        if (req.file) {
            newUser.profilePicture = process.env.API + '/public/' + req.file.filename
        }
        const _user = new User(newUser)
        await _user.save()
        if (_user) {
            res.status(201).json({ _user, messages: 'User created successfully!!!' })
        } else {
            res.status(10400).json({ error })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' })
        } else {
            if (user.comparePassword(req.body.password)) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '365d' })
                res.cookie('token', token, { expiresIn: '3d' })
                return res.status(200).json({
                    token,
                    user
                })
            } else {
                return res.status(401).json({ message: 'Invalid password' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const logOut = async (req, res) => {
    try {
        await res.clearCookie('token')
        res.status(200).json({ message: 'Sign out successfully!!!' })
    } catch (error) {
        res.status(400).json({ error })
    }
}