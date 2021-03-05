import multer from 'multer'
import path from 'path'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const __dirname = path.resolve();
//     cb(null, path.join(__dirname, 'src/uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// export const upload = multer({ storage })

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

export const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'magazine-system',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

const downloadParams = {
  Bucket: 'magazine-system',
  Key: '', // pass key
}

export const s3Download = {};
s3Download.s3 = s3;
s3Download.downloadParams = downloadParams;


