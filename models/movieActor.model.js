module.exports = (sequelize, type) => {
    const MovieActor = sequelize.define('movies_actors', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movieId: {
            type: type.INTEGER,
            references: {
                model: 'movies',
                key: 'id'
            }
        },
        actorId: {
            type: type.INTEGER,
            references: {
                model: 'actors',
                key: 'id'
            }
        }
    });
    return MovieActor;
};
