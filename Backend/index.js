import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cookieParser())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




