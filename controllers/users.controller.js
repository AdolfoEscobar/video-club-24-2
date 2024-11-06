const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

async function create(req, res, next) {
    try {
        const { name, lastName, email, password, role } = req.body;
        
        // Generar salt
        const salt = await bcrypt.genSalt(10);
        // Hashear password
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            lastName,
            email,
            password: passwordHash,
            saltkey: salt,
            role: role || 'viewer'
        });

        res.status(201).json({
            msg: "Usuario creado correctamente",
            obj: user
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al crear usuario",
            obj: err.message
        });
    }
}

async function list(req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            msg: "Error al listar usuarios",
            obj: err.message
        });
    }
}

async function index(req, res, next) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
                obj: null
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener usuario",
            obj: err.message
        });
    }
}

function replace(req, res, next) {
    
}
function update(req, res, next) {
    res.send('PATCH  => /users/:id');
}
function destroy(req, res, next) {
    res.send('DELETE  => /users/:id');
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
};
