const Director = require('../models/director.model');

async function create(req, res, next) {
    try {
        const { name, lastName } = req.body;
        const director = await Director.create({ name, lastName });
        res.json(director);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function list(req, res, next) {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res, next) {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.json(director);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function replace(req, res, next) {
    try {
        const { id } = req.params;
        const { name, lastName } = req.body;
        const director = await Director.findByIdAndUpdate(
            id,
            { name, lastName },
            { new: true }
        );
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.json(director);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        const { name, lastName } = req.body;
        director.name = name || director.name;
        director.lastName = lastName || director.lastName;
        await director.save();
        res.json(director);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        await Director.findByIdAndDelete(id);
        res.json({ message: 'Director deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { create, list, index, replace, update, destroy };
