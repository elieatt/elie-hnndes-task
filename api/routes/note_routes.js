const express = require('express');
const Note = require('../models/note_model');
const Author = require('../models/author_model');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({ Message: 'Failed to create note, missing required parameters' });
            return;
        }
        const note = await Note.create({ title, content, AuthorId: req.authorId });
        res.status(201).json({ Message: "Note was created successfully", Note: note });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Message: "Failed to create note", Error: e });
    }
});

router.get('/', async (req, res) => {
    try {
        const notes = await Note.findAll({
            where: { AuthorId: req.authorId },
           
        });
        res.status(200).json({Count:notes.length, Notes: notes });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Message: "Failed to retrieve notes", Error: e });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findOne({
            where: { id: req.params.id, AuthorId: req.authorId },
            
        });
        if (note) {
            res.status(200).json({ Note: note });
        } else {
            res.status(404).json({ Message: "Failed to retrieve note", Error: "Note was not found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Message: "Failed to retrieve note", Error: e });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Note.destroy({ where: { id: req.params.id, AuthorId: req.authorId } });
        if (result) {
            res.status(204).json({ Message: `Note with id ${req.params.id} was deleted successfully` });
        } else {
            res.status(404).json({ Message: `Failed to delete note, note was not found` });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Message: "Failed to delete note", Error: e });
    }
});

module.exports = router;