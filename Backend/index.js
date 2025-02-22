import express from 'express'
import cookieParser from 'cookie-parser'
import router from './user-services/user.routes'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cookieParser())

//specify the routes
app.use("/register/v1", router)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




