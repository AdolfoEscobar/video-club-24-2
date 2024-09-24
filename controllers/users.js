const express = require('express');

function create(req, res, next) {
    res.send(`POST => /users/ => ${req.body.name}`);
}

function list(req, res, next) {
    res.send('GET => /users/');
}

function index(req, res, next) {
    res.send(`GET => /users/${req.params.id}`);
}

function replace(req, res, next) {
    res.send('PUT => /users/:id');
}

function update(req, res, next) {
    res.send('PATCH => /users/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /users/:id');
}

module.exports = {create,list,index,replace,update,destroy};