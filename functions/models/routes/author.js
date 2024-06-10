const express = require('express');
const AuthorModel = require('../models/author');

const router = express.Router();

//GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        res.json(authors);
    } catch(err) {
        res.status(500).json({ message: err.message});
    }
});

//GET a single author
router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author);
});

//CREATE an Author
router.post('/', async (req, res) => {
    try {
        //validate request body
        if (!req.body.name || !req.body.age) {
            return res.status(400).json({ message: 'Name and age are required'});
        }

        //Check if the author's name already exists
        const existingAuthor = await AuthorModel.findOne({ name: req.body.name});
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author already exists'});
        }

        const author = new AuthorModel(req.body);
        const newAuthor = await author.save();
        res
            .status(201)
            .json({ message: 'Author created successfully', author: newAuthor});
    }   catch (err) {
        res.status(400).json({ message: err.message});
    }
});


//UPDATE an Author
router.patch('/:id', getAuthor, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.author.name = req.body.name;
        }
        const updatedAuthor = await res.author.save();
        res.json(updatedAuthor);
     }  catch (err) {
        res.status(400).json({ message: err.message});
    }
});

router.put('/:id', getAuthor, async (req, res) => {
    try {
        const updatedAuthor = await AuthorModel.findByAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedAuthor);
    }   catch (err) {
        res.status(400).json({ message: err.message});

    }
});

//DELETE an author
router.delete('.id:', getAuthor, async (req, res) => {
    try{
        await AuthorModel.findByIdandDelete(req.params.id);
        res.json({message: 'Author Deleted'});
    }   catch (err) {
        res.status(500).json({message: err.message});
    }    
});

//Middleware function to get a single author by ID
async function getAuthor(req, res, next) {
    try {
        const author = await AuthorModel.findById(req,params.id);
        if (!author) {
            return res.status(404).json({message: 'Author not found'});
        }
        res.author = author;
        next();
    }   catch(err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = router;