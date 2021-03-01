import express from 'express'
import { getClosureDate, addClosureDate, editClosureDate } from '../controllers/term.js'
import { checkRole } from '../common-middleware/index.js'
const router = express.Router()

router.get('/getClosureDate', getClosureDate)
router.post('/setClosureDate', checkRole('admin'), addClosureDate)
router.put('/editClosureDate/:_id', checkRole('admin'), editClosureDate)

export default router