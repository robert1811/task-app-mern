require('dotenv').config()
import express from 'express'
import cors from 'cors'

const app = express()

app.set('port', process.env.PORT || 3000)
require('./db')

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(require('./routes/index'))

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))