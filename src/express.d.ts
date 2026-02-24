// This to declare user role

declare global {
    namespace Express {
        interface Request {
            user?: {
                role?: 'admin' | 'teacher' | 'student'
            }
        }
    }
}

export {}