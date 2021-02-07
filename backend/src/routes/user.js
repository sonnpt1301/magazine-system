import express from 'express'
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { getUsers } from '../controllers/user.js'

const router = express.Router()

router.get('/get-users', requireSignIn, checkRole('admin'), getUsers)   

export default router