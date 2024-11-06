const Movie = require('../models/movie.model');
const Actor = require('../models/actor.model');
const MovieActor = require('../models/movieActor.model');

async function create(req, res, next) {
    try {
        const { title, genreId, directorId } = req.body;
        const movie = await Movie.create({ title, genreId, directorId });
        res.json(movie);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function list(req, res, next) {
    try {
        const movies = await Movie.find()
            .populate('genreId')
            .populate('directorId')
            .populate({
                path: 'actors',
                populate: {
                    path: 'actorId'
                }
            });
        res.json(movies);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function addActor(req, res, next) {
    try {
        const { movieId, actorId } = req.body;
        const movie = await Movie.findById(movieId);
        const actor = await Actor.findById(actorId);
        
        if (!movie || !actor) {
            return res.status(404).json({ 
                message: !movie ? 'Movie not found' : 'Actor not found' 
            });
        }

        await MovieActor.create({ movieId, actorId });
        res.json({ message: 'Actor added to movie' });
    } catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res, next) {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id)
            .populate('genreId')
            .populate('directorId');
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function replace(req, res, next) {
    try {
        const { id } = req.params;
        const { title, genreId, directorId } = req.body;
        const movie = await Movie.findByIdAndUpdate(
            id,
            { title, genreId, directorId },
            { new: true }
        );
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(400).json(err);
    }
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
