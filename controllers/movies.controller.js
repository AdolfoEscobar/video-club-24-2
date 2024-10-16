const express = require('express');
const { Movie, Actor } = require('../db');

function create(req, res, next) {
    const { title, genreId, directorId } = req.body;

    Movie.create({
        title,
        genreId,
        directorId
    })
        .then(movie => {
            res.json(movie);
        })
        .catch(err => {
            res.status(400).json(err);
        });

}
function list(req, res, next) {
    Movie.findAll({include: ['genre', 'director', 'actors']})
        .then(movie => {
            res.json(movie);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function addActor(req, res, next) {
    const { movieId, actorId } = req.body;

    Movie.findByPk(movieId).then(movie => {
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        Actor.findByPk(actorId).then(actor => {
            if (!actor) {
                return res.status(404).json({ message: 'Actor not found' });
            }
            movie.addActor(actor)
                .then(() => {
                    res.json({ message: 'Actor added to movie' });
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
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
    addActor,
    index,
    replace,
    update,
    destroy
};
