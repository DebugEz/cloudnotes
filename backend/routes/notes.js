const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../modals/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the Notes using GET "/api/auth/fetchnotes". Login required.
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Add a new Note using POST "/api/auth/addnote". Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new note
        const note = new Note({
            title, description, tag, user: req.user.id
        });

        // Save the note to the database
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3: update an existing Note using PUT: "/api/auth/updatenote". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
    //create newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("not found") };

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})

// ROUTE 4: Delete an existing Note using DELETE: "/api/auth/deletenote". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     try {
    //find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("not found") };
    
    //allow deletion only if the user own this Note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note})
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");  
}
})
module.exports = router;
