import express from 'express'
import subjectsRouter from './routes/departments' 
import cors from 'cors'

const port = process.env.PORT || 3000
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.get('/health', (req, res)=>{
    res.json({
        message: "welcome to our dashboard"
    })
})

app.use('/api/subjects', subjectsRouter)

app.listen(port , ()=> console.log(`running on localhost: ${port}`))