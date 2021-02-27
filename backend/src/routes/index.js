import authRoutes from './auth.js'
import facultyRoutes from './faculty.js'
import contributionRoutes from './contribution.js'
import userRoutes from './user.js'
import chatRoutes from './chat.js'
import { requireSignIn, checkRole } from '../common-middleware/index.js'


const route = (app) => {
    app.use('/api/auth', authRoutes)
    app.use('/api/faculty', requireSignIn, facultyRoutes)
    app.use('/api/contribution', contributionRoutes)
    app.use('/api/chat', chatRoutes)
    app.use('/api/user', requireSignIn, userRoutes)
}

export default route