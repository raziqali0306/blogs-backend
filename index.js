const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

app = express()

dotenv.config()
app.use(express.json())
app.use(require('cors')())
app.use(require('morgan')('dev'))
app.use('/posts', require('./routes/postRoutes'));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('mongodb connected');
})
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('server started at PORT 3000')
    })
})