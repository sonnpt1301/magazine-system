import express from 'express'
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { getUsers, updateUser, deleteUser, uploadAvatar} from '../controllers/user.js'
import { upload } from '../upload.js'

const router = express.Router()

router.get('/get-users', getUsers)   
router.put('/update/:id', updateUser)
router.put('/uploadAvatar/:id', upload.array('profilePicture'), uploadAvatar)
router.put('/delete/:id', deleteUser)

export default router