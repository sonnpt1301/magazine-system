import express from 'express'
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { getUsers, updateUser, deleteUser } from '../controllers/user.js'

const router = express.Router()

router.get('/get-users', getUsers)   
router.put('/update/:id', updateUser)
router.put('/delete/:id', deleteUser)

export default router