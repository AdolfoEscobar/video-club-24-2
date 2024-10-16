const express = require('express');
const { Director } = require('../classes/db');

function create(req, res, next) {
    const { name, lastName } = req.body;

    Director.create({
        name,
        lastName
    })
        .then(director => {
            res.json(director);
        })
        .catch(err => {
            res.status(400).json(err);
        });

}
function list(req, res, next) {
    Director.findAll()
        .then(directors => {
            res.json(directors);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function index(req, res, next) {
    const { id } = req.params;
    Director.findByPk(id)
        .then(director => {
            if (!director) {
                return res.status(404).json({ message: 'Director not found' });
            }
            res.json(director);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function replace(req, res, next) {
    const { id } = req.params;
    Director.findByPk(id).then(director => {
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        const { name, lastName } = req.body;
        director.name = name;
        director.lastName = lastName;
        director.save()
            .then(director => {
                res.json(director);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });    
}
function update(req, res, next) {
    const { id } = req.params;
    Director.findByPk(id).then(director => {
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        const { name, lastName } = req.body;
        director.name = name || director.name;
        director.lastName = lastName || director.lastName;
        director.save()
            .then(director => {
                res.json(director);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}
function destroy(req, res, next) {
    const { id } = req.params;
    Director.destroy({
        where: {
            id
        }
    })
        .then(() => {
            res.json({ message: 'Director deleted' });
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
