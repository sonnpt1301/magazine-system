import Contribution from '../models/contribution.js'
import User from '../models/user.js'
import Comment from '../models/comment.js'
import nodemailer from 'nodemailer'
import AdmZip from 'adm-zip'
import mongoose from 'mongoose'

export const getAllContributions = async (req, res) => {
    try {
        const contributions = await Contribution.aggregate([
            { $match: { is_deleted: { $ne: true } } },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user_info' } },
            { $unwind: "$user_info" },
        ])
        res.status(200).json({ contributions })
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async (req, res) => {
    try {

        const files = req.files['filesUpload']
        const background = req.files['contributionImage']
        const sender = await User.findOne({
            _id: req.user._id
        })
        const filesUpload = files.map(({ filename, path }) => ({ fileName: filename, filePath: path }))
        const bgUpload = background.map(({ filename }) => ({ img: filename }))
        const receiver = await User.findOne({
            facultyId: sender.facultyId,
            role: 'coordinator'
        })

        const newContribution = new Contribution({
            author: req.user._id,
            title: req.body.title,
            description: req.body.description,
            filesUpload: filesUpload,
            contributionImage: bgUpload,
            facultyId: sender.facultyId
        })

        const contri = await newContribution.save()
        const contribution = await Contribution.aggregate([
            { $match: { _id: contri._id } },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user_info' } },
            { $unwind: "$user_info" },
        ])

        const {
            fullName
        } = sender
        // send email notify coordinator when contribution is submitted in their faculty
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        await transporter.sendMail({
            from: '"Magazine System" <jokerboy1412@gmail.com>', // sender address
            to: receiver.email, // list of receivers
            subject: "Notification ✔", // Subject line 
            text: "Hello world?", // plain text body
            html: `<b>Your Faculty has the contribution is submitted by ${fullName}</b>` // html body
        });
        res.status(201).json({
            contribution
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

export const updateContribution = async (req, res) => {
    try {
        const { id } = req.params
        const files = req.files
        const filesUpload = files.map(({ filename, path }) => ({ fileName: filename, filePath: path }))
        const contri = await Contribution.findOneAndUpdate({ _id: id }, {
            $set: {
                ...req.body,
                filesUpload
            }
        }, { new: true })
        const contribution = await Contribution.aggregate([
            { $match: { _id: contri._id } },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user_info' } },
            { $unwind: "$user_info" },
        ])
        res.status(200).json({ contribution })
    } catch (error) {
        console.log(error)
    }
}

export const publicContribution = async (req, res) => {
    try {
        let {
            ids
        } = req.body
        await Contribution.updateMany({
            _id: {
                $in: ids
            }
        }, {
            is_public: true
        }, {
            multi: true
        });

        ids = ids.map(function (el) { return mongoose.Types.ObjectId(el) })

        const publishedContribution = await Contribution.aggregate([
            { $match: { "_id": { "$in": ids } } },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user_info' } },
            { $unwind: "$user_info" },
        ])

        res.status(200).json({
            publishedContribution, message: 'Public successfully'
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

export const downloadFile = async (req, res) => {
    try {
        const {
            contributionId, id
        } = req.params
        const file = await Contribution.findOne({
            _id: contributionId
        })
        const fileDownload = file.filesUpload.find(x => String(x._id) === id)

        console.log(file.fileName)
        if (file) {
            const zip = new AdmZip();
            zip.addLocalFile(fileDownload.filePath);
            // Define zip file name
            const downloadName = `${fileDownload.fileName}.zip`;
            const data = zip.toBuffer();
            // code to download zip file
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            res.set('Content-Length', data.length);
            res.send(data);
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

export const listComment = async (req, res) => {
    try {
        const listComment = await Comment.find()
        res.status(200).json({ listComment })
    } catch (error) {
        console.log(error)
    }
}

export const addComment = async (req, res) => {
    try {
        const { contributionId } = req.params
        const newComment = new Comment({
            author: req.user._id,
            contributionId: contributionId,
            content: req.body.content
        })

        const comment = await newComment.save()
        res.status(201).json({ comment })
    } catch (error) {
        console.log(error)
    }
}

export const statistic = async (req, res) => {
    try {
        const contribution = await Contribution.aggregate([{
            $lookup: {
                from: 'faculties', // other table name
                localField: 'facultyId', // name of users table field
                foreignField: '_id', // name of userinfo table field
                as: 'faculty_info' // alias for userinfo table
            }
        }, {
            $unwind: '$faculty_info'
        }, {
            $group: {
                _id: {
                    facultyId: '$facultyId',
                    'Faculty Name': '$faculty_info.name'
                },
                count: {
                    $sum: 1
                }
            }
        }, {
            $sort: {
                'count': -1
            }
        },])
        console.log(contribution)
        res.status(200).json({
            contribution
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}