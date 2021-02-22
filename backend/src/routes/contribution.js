import express from 'express'
import { uploadFile, downloadFile, publicContribution, statistic, getAllContributions, addComment, listComment, updateContribution } from '../controllers/contribution.js';
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { upload } from '../upload.js'
const router = express.Router()


router.post('/update-contribution/:id', upload.array('filesUpload'), requireSignIn, checkRole('student'), updateContribution)
router.get('/list-comment', listComment)
router.post('/:contributionId/comment', requireSignIn, addComment)
router.get('/get-all-contributions', getAllContributions)
router.post('/upload-file', upload.array('filesUpload'), requireSignIn, checkRole('student'), uploadFile)
router.get('/:contributionId/download/:id', requireSignIn, downloadFile)
router.post('/public-contribution', publicContribution)
router.get('/statistic', statistic)

export default router