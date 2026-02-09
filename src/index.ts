import express from 'express'

const app = express()

app.use('/', (req, res)=>{
    res.json({
        message: "welcome to our dashboard"
    })
})

app.listen(3000, ()=> console.log("running on localhost:3000"))