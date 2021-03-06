import Contribution from '../models/contribution.js'
import User from '../models/user.js'
import Comment from '../models/comment.js'
import nodemailer from 'nodemailer'
import AdmZip from 'adm-zip'
import mongoose from 'mongoose'
import { s3Download } from '../upload.js'
import fs from 'fs'

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
        const filesUpload = files.map(({ originalname, key }) => ({ fileName: originalname, filePath: key }))
        const bgUpload = background.map(({ location }) => ({ img: location }))
        const receiver = await User.findOne({
            facultyId: sender.facultyId,
            role: 'coordinator'
        })

        const newContribution = new Contribution({
            author: req.user._id,
            title: req.body.title,
            description: req.body.description,
            termId: req.body.termId,
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
        const filesUpload = files.map(({ originalname, key }) => ({ fileName: originalname, filePath: key }))
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

        const contribution = await Contribution.findOne({ _id: req.body.ids })

        let {
            ids
        } = req.body
        await Contribution.updateMany({
            _id: {
                $in: ids
            }
        }, {
            $set: { is_public: !contribution.is_public }
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

const getObjectS3 = async (s3Client, params) => {
    return await new Promise((resolve, reject) => {
        s3Client.getObject(params, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export const downloadFile = async (req, res) => {
    let fileName
    try {
        const s3Client = s3Download.s3;
        const params = s3Download.downloadParams
        const {
            contributionId, id
        } = req.params
        const file = await Contribution.findOne({
            _id: contributionId
        })
        const fileDownload = file.filesUpload.find(x => String(x._id) === id)
        params.Key = fileDownload.filePath

        const data = await getObjectS3(s3Client, params)
        if (data) {
            const zip = new AdmZip();
            fileName = fileDownload.fileName
            fs.writeFileSync(fileName, data.Body);
            zip.addFile(fileName, data.Body);

            // Define zip file name
            const downloadName = `${fileDownload.fileName}.zip`;
            const zipData = zip.toBuffer();
            // code to download zip file
            res.set({
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename=${downloadName}`,
                'Content-Length': zipData.length,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
            })

            res.send(zipData);
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

    fs.unlinkSync(fileName)
}

export const listComment = async (req, res) => {
    try {
        const listComment = await Comment.aggregate([
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user_info' } },
            { $unwind: "$user_info" },
        ])
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

        const cmt = await newComment.save()
        const comment = await Comment.aggregate([
            { $match: { _id: cmt._id } },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user_info' } },
            { $unwind: "$user_info" },
        ])
        res.status(201).json({ comment })
    } catch (error) {
        console.log(error)
    }
}

export const statistic = async (req, res) => {
    try {
        const statistic = await Contribution.aggregate([
            { $lookup: { from: 'faculties', localField: 'facultyId', foreignField: '_id', as: 'faculty_info' } },
            { $unwind: '$faculty_info' },
            {
                $group: {
                    _id: { termId: '$termId', facultyId: '$facultyId', 'facultyName': '$faculty_info.name' }, count: { $sum: 1 },
                    is_public: { $sum: { $cond: ["$is_public", 1, 0] } },
                }
            },
            { $sort: { 'count': -1 } },
        ])

        console.log(statistic)
        res.status(200).json({
            statistic
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// facultyId: '$facultyId', 'Faculty Name': '$faculty_info.name'