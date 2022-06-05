// Router for all api js server files. Server.js will refer to this one file only to connect all api server files.
const express = require('express')
const app = express()

const notesRouter = require('./notes')
app.use('/notes', notesRouter)

module.exports = app;