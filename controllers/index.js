const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const config = require('config');

const jwtKey = config.get("secret.key");

function home(req, res, next){
    res.render('index', { title: 'Express'});
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Verificar que email y password estén presentes
        if (!email || !password) {
            return res.status(400).json({
                msg: res.__('login.fail'),
                obj: null
            });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(403).json({
                msg: res.__('login.fail'),
                obj: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generar token con mayor duración (7 días)
            const token = jwt.sign(
                { 
                    userId: user._id,
                    email: user.email,
                    role: user.role
                },
                jwtKey,
                { expiresIn: '7d' }
            );

            res.json({
                msg: res.__('login.ok'),
                obj: user,
                token
            });
        } else {
            res.status(403).json({
                msg: res.__('login.fail'),
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