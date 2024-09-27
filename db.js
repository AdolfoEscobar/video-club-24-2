const Sequelize =  require('sequelize');

/*
    1) Nombre de la base de datos
    2) Usuario
    3) Password
    4) Objeto de configuracion <<ORM>>
*/ 

const sequelize = new Sequelize('video-club', 'root', 'Fofito250803', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos sincronizada correctamente.");
});
