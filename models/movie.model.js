module.exports = (sequelize, type) => {
    const Movie = sequelize.define('movies', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        status: type.BOOLEAN,
        genreId: {
            type: type.INTEGER,
            references: {
                model: 'genres',
                key: 'id'
            }
        },
        directorId: {
            type: type.INTEGER,
            references: {
                model: 'directors',
                key: 'id'
            }
        }
    });
    return Movie;
};
