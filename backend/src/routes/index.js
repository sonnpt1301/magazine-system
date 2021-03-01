import authRoutes from './auth.js'
import facultyRoutes from './faculty.js'
import contributionRoutes from './contribution.js'
import userRoutes from './user.js'
import chatRoutes from './chat.js'
import termRoutes from './term.js'
import { requireSignIn, checkRole } from '../common-middleware/index.js'


const route = (app) => {
    app.use('/api/auth', authRoutes)
    app.use('/api/faculty', requireSignIn, facultyRoutes)
    app.use('/api/contribution', requireSignIn, contributionRoutes)
    app.use('/api/chat', requireSignIn, chatRoutes)
    app.use('/api/user', requireSignIn, userRoutes)
    app.use('/api/term', requireSignIn, termRoutes)
}

export default route