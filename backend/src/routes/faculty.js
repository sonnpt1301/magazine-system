import express from 'express'
import { getFaculty, createFaculty, updateFaculty, deleteFaculty } from '../controllers/faculty.js'

const router = express.Router()

router.post('/createFaculty', createFaculty)
router.put('/updateFaculty/:id', updateFaculty)
router.patch('/deleteFaculty:/id', deleteFaculty)
router.get('/getFaculty', getFaculty)

export default router