const router = require('express').Router()
const { readAndAppend, readFromFile } = require('../../helpers/fsUtils');
// const uuid  = require("../../helpers/uuid");

// Get route for retrieving all notes
router.get('/', (req, res) => {
    console.info(`${req.method} request received for all notes.`)
    readFromFile('./db/db.json').then(data => res.send(data))
})

// Post route for adding new notes.
router.post('/', (req, res) => {
    // Make sure req.body is returned
    // console.log(req.body)

    const { title, text } = req.body;

    if (title, text) {
        const newNote = {
            title,
            text,
            // add uuid later
            // note_id: uuid()
        };
        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'Response saved into db.json',
            body: newNote
        }
        res.send(response)
    } else {
        res.send(`Error, title or data came out false. Title: ${!!title}, text: ${!!text}`)
    }
})

router.delete('/', (req, res) => {
    console.log(req)
})

module.exports = router;