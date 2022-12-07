const { connectDB } = require('./lib/mongodb')

require('dotenv').config()

app = require('express')()
app.use(require('express').json())
app.use(require('cors')())
app.use(require('morgan')('dev'))

app.use('/api/posts', require('./routes/posts.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

connectDB()
    .then(() => {
        console.log('mongodb connected');

        app.listen(process.env.PORT || 3000, () => {
            console.log('server started at PORT 3000')
        })
    })