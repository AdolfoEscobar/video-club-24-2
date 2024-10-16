const express = require('express');
const { Actor } = require('../classes/db');

function create(req, res, next) {
    const { name, lastName } = req.body;

    Actor.create({
        name,
        lastName
    })
        .then(actor => {
            res.json(actor);
        })
        .catch(err => {
            res.status(400).json(err);
        });

}
function list(req, res, next) {
    Actor.findAll({include: ['movies']})
        .then(actors => {
            res.json(actors);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function index(req, res, next) {
    const { id } = req.params;
    Actor.findByPk(id)
        .then(actor => {
            if (!actor) {
                return res.status(404).json({ message: 'Actor not found' });
            }
            res.json(actor);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function replace(req, res, next) {
    const { id } = req.params;
    Actor.findByPk(id).then(actor => {
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        const { name, lastName } = req.body;
        actor.name = name;
        actor.lastName = lastName;
        actor.save()
            .then(actor => {
                res.json(actor);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });    
}
function update(req, res, next) {
    const { id } = req.params;
    Actor.findByPk(id).then(actor => {
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        const { name, lastName } = req.body;
        actor.name = name || actor.name;
        actor.lastName = lastName || actor.lastName;
        actor.save()
            .then(actor => {
                res.json(actor);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}
function destroy(req, res, next) {
    const { id } = req.params;
    Actor.destroy({
        where: {
            id
        }
    })
        .then(() => {
            res.json({ message: 'Actor deleted' });
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
};
