import express from 'express'
import { requireSignIn } from '../common-middleware/index.js'
import { getProfile } from '../controllers/user.js'

const router = express.Router()

router.get('/profile', requireSignIn, getProfile)

export default router