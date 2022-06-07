const notes = require('express').Router()
const fs = require('fs')

// Read and write to database file methods. Asynch and reads WHOLE database
// For future reference use streams and pipes for a more scalable server where database is not read as a whole but is read in chunks
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');

// Get route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// Post route for adding new notes.
notes.post('/', (req, res) => {
    // Make sure req.body is returned
    // console.log(req.body)

    const { title, text } = req.body;

    if (title, text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
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

notes.delete('/:id', (req, res) => {
    const id = req.params.id
    let currentNotes = JSON.parse(fs.readFileSync('./db/db.json', { encoding: 'utf8' }))

    // If id doesn't match the id we want to remove we keep in it the currentNotes array
    currentNotes = currentNotes.filter(note => note.id !== id)

    // Writing our current array of notes onto db.json and sending our response
    fs.writeFileSync('./db/db.json', JSON.stringify(currentNotes))
    res.send('Note has been deleted')
})

module.exports = notes;