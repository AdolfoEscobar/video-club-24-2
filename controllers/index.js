const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')

function home(req, res, next){
    res.render('index', { title: 'Express'});
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Verificar que email y password estén presentes
        if (!email || !password) {
            return res.status(400).json({
                msg: "Email y contraseña son requeridos",
                obj: null
            });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(403).json({
                msg: "Usuario y/o contraseña incorrectos",
                obj: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json({
                msg: "Sesión iniciada correctamente",
                obj: user
            });
        } else {
            res.status(403).json({
                msg: "Usuario y/o contraseña incorrectos",
                obj: null
            });
        }
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({
            msg: "Error en el servidor",
            obj: err.message
        });
    }
}

module.exports = {home, login}