import express from 'express'
import { uploadFile, downloadFile, publicContribution, statistic, getAllContributions, addComment, listComment, updateContribution } from '../controllers/contribution.js';
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { upload } from '../upload.js'
const router = express.Router()


router.post('/update-contribution/:id', upload.array('filesUpload'), checkRole('student'), updateContribution)
router.get('/list-comment', listComment)
router.post('/:contributionId/comment', requireSignIn, addComment)
router.get('/get-all-contributions', getAllContributions)
router.post('/upload-file', upload.fields([{ name: 'filesUpload' }, { name: 'contributionImage' }]), checkRole('student'), uploadFile)
router.get('/:contributionId/download/:id', downloadFile)
router.post('/public-contribution', checkRole('coordinator'), publicContribution)
router.get('/statistic', statistic)

export default router