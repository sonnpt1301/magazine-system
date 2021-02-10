import express from 'express'
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { getUsers, updateUser, deleteUser } from '../controllers/user.js'

const router = express.Router()

router.get('/get-users', requireSignIn, checkRole('admin'), getUsers)   
router.put('/update/:id', requireSignIn, checkRole('admin'), updateUser)
router.put('/delete/:id', requireSignIn, checkRole('admin'), deleteUser)

export default router