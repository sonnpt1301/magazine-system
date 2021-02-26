import express from 'express'
import { getMessage } from '../controllers/chat.js'

const router = express.Router()

router.get('/get-message', getMessage)

export default router