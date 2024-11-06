const Role = require('../models/role.model');

async function create(req, res) {
    try {
        const { name, permissions, description } = req.body;
        const role = await Role.create({
            name,
            permissions,
            description
        });
        
        res.status(201).json({
            msg: "Rol creado correctamente",
            obj: role
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al crear rol",
            obj: err.message
        });
    }
}

async function list(req, res) {
    try {
        const roles = await Role.find();
        res.json({
            msg: "Roles obtenidos correctamente",
            obj: roles
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al listar roles",
            obj: err.message
        });
    }
}

async function index(req, res) {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({
                msg: "Rol no encontrado",
                obj: null
            });
        }
        res.json({
            msg: "Rol encontrado",
            obj: role
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener rol",
            obj: err.message
        });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, permissions, description } = req.body;
        
        const role = await Role.findByIdAndUpdate(
            id,
            { name, permissions, description },
            { new: true }
        );
        
        if (!role) {
            return res.status(404).json({
                msg: "Rol no encontrado",
                obj: null
            });
        }

        res.json({
            msg: "Rol actualizado correctamente",
            obj: role
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al actualizar rol",
            obj: err.message
        });
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const role = await Role.findByIdAndDelete(id);
        
        if (!role) {
            return res.status(404).json({
                msg: "Rol no encontrado",
                obj: null
            });
        }

        res.json({
            msg: "Rol eliminado correctamente",
            obj: role
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al eliminar rol",
            obj: err.message
        });
    }
}

module.exports = {
    create,
    list,
    index,
    update,
    destroy
};
