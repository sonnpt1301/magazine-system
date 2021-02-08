import express from 'express'
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { getUsers, updateUser } from '../controllers/user.js'

const router = express.Router()

router.get('/get-users', requireSignIn, checkRole('admin'), getUsers)   
router.put('/update/:id', requireSignIn, checkRole('admin'), updateUser)

export default router