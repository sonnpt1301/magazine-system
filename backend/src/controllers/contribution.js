import Contribution from '../models/contribution.js'
import User from '../models/user.js'
import nodemailer from 'nodemailer'
import AdmZip from 'adm-zip'




export const getAllContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find({ is_deleted: { $ne: true } })
        res.status(200).json({ contributions })
    } catch (error) {
        console.log(error)
    }
}

export const getPublicContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find({
            is_public: true
        })
        res.status(200).json({
            contributions
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

export const getContributionsByFaculty = async (req, res) => {
    try {
        const {
            _id
        } = req.user
        const coordinator = await User.findOne({
            _id
        })
        const contributions = await Contribution.find({
            facultyId: coordinator.facultyId,
        })
        res.status(200).json({
            contributions
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}


export const uploadFile = async (req, res) => {
    try {

        const files = req.files
        const sender = await User.findOne({
            _id: req.user._id
        })
        const filesUpload = files.map(({ filename, path }) => ({ fileName: filename, filePath: path }))
        const receiver = await User.findOne({
            facultyId: sender.facultyId,
            role: 'coordinator'
        })

        const newContribution = new Contribution({
            title: req.body.title,
            description: req.body.description,
            filesUpload: filesUpload,
            facultyId: sender.facultyId
        })

        const contribution = await newContribution.save()

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

export const publicContribution = async (req, res) => {
    try {
        const {
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

        const publishedContribution = await Contribution.find({ _id: { $in: ids } })

        res.status(200).json({
            publishedContribution, message: 'Public successfully'
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}