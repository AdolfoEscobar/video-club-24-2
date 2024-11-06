const express = require('express');
const router = express.Router();
const controller = require('../controllers/roles.controller');
const checkAbility = require('../middleware/checkAbility');

/* POST create role. */
router.post('/', checkAbility('create', 'Role'), controller.create);

/* GET roles listing. */
router.get('/', checkAbility('read', 'Role'), controller.list);

/* GET role by id. */
router.get('/:id', checkAbility('read', 'Role'), controller.index);

/* PUT update role by id. */
router.put('/:id', checkAbility('update', 'Role'), controller.update);

/* DELETE role by id. */
router.delete('/:id', checkAbility('delete', 'Role'), controller.destroy);

module.exports = router;
