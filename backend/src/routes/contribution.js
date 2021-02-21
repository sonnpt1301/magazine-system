import express from 'express'
import { uploadFile, downloadFile, publicContribution, statistic, getAllContributions, getPublicContributions, getContributionsByFaculty } from '../controllers/contribution.js';
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { upload } from '../upload.js'
const router = express.Router()

router.get('/get-all-contributions', getAllContributions)
router.get('/get-public-contributions', getPublicContributions)
router.get('/contributions-by-faculty', requireSignIn, checkRole('coordinator'), getContributionsByFaculty)
router.post('/upload-file', upload.array('filesUpload'), requireSignIn, checkRole('student'), uploadFile)
router.get('/:contributionId/download/:id', requireSignIn, checkRole('coordinator', 'manager'), downloadFile)
router.post('/public-contribution', publicContribution)
router.get('/statistic', statistic)

export default router