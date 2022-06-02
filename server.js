const express = require('express')
const path = require(path)
const app = express()
const PORT = process.env.PORT || 3001;

const middleware = [
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]
app.use(middleware)

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT})`))