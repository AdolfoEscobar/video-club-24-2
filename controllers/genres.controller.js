const Genre = require('../models/genre.model');

async function create(req, res, next) {
    try {
        const { description, status } = req.body;
        const genre = await Genre.create({ description, status });
        res.json(genre);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function list(req, res, next) {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res, next) {
    try {
        const { id } = req.params;
        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function replace(req, res, next) {
    try {
        const { id } = req.params;
        const { description, status } = req.body;
        const genre = await Genre.findByIdAndUpdate(
            id,
            { description, status },
            { new: true }
        );
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        const { description, status } = req.body;
        genre.description = description || genre.description;
        genre.status = status || genre.status;
        await genre.save();
        res.json(genre);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        await Genre.findByIdAndDelete(id);
        res.json({ message: 'Genre deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { create, list, index, replace, update, destroy };
