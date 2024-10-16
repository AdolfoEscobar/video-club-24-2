const express = require('express');
const { Genre } = require('../db');

function create(req, res, next) {
    const { description, status } = req.body;

    Genre.create({
        description,
        status
    })
        .then(genre => {
            res.json(genre);
        })
        .catch(err => {
            res.status(400).json(err);
        });

}
function list(req, res, next) {
    Genre.findAll()
        .then(genre => {
            res.json(genre);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function index(req, res, next) {
    const { id } = req.params;
    Genre.findByPk(id)
        .then(genre => {
            if (!genre) {
                return res.status(404).json({ message: 'Genre not found' });
            }
            res.json(genre);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function replace(req, res, next) {
    const { id } = req.params;
    Genre.findByPk(id).then(genre => {
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        const { description, status } = req.body;
        genre.description = description;
        genre.status = status;
        genre.save()
            .then(genre => {
                res.json(genre);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });    
}
function update(req, res, next) {
    const { id } = req.params;
    Genre.findByPk(id).then(genre => {
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        const { description, status } = req.body;
        genre.description = description || genre.description;
        genre.status = status || genre.status;
        genre.save()
            .then(genre => {
                res.json(genre);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}
function destroy(req, res, next) {
    const { id } = req.params;
    Genre.destroy({
        where: {
            id
        }
    })
        .then(() => {
            res.json({ message: 'Genre deleted' });
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
