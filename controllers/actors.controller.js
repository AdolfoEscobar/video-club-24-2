const Actor = require('../models/actor.model');

async function create(req, res, next) {
    try {
        const { name, lastName } = req.body;
        const actor = await Actor.create({ name, lastName });
        res.json(actor);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function list(req, res, next) {
    try {
        const actors = await Actor.find().populate('movies');
        res.json(actors);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res, next) {
    try {
        const { id } = req.params;
        const actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.json(actor);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function replace(req, res, next) {
    try {
        const { id } = req.params;
        const { name, lastName } = req.body;
        const actor = await Actor.findByIdAndUpdate(
            id,
            { name, lastName },
            { new: true }
        );
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.json(actor);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        const { name, lastName } = req.body;
        actor.name = name || actor.name;
        actor.lastName = lastName || actor.lastName;
        await actor.save();
        res.json(actor);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        await Actor.findByIdAndDelete(id);
        res.json({ message: 'Actor deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { create, list, index, replace, update, destroy };
