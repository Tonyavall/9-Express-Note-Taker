const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001;

const htmlRoutes = require('./routes/viewRoutes')
const apiRoutes = require('./routes/api/apiRoutes')

const middleware = [
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]
app.use(middleware)

// All routes
app.use(htmlRoutes)
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT})`))