const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const checkAbility = require('../middleware/checkAbility');

/* POST create user. */
router.post('/', controller.create);

/* GET users listing. */
router.get('/', checkAbility('read', 'User'), controller.list);

/* GET user by id. */
router.get('/:id', checkAbility('read', 'User'), controller.index);

/* PUT replace user by id. */
router.put('/:id', checkAbility('update', 'User'), controller.replace);

/* PATCH update user by id. */
router.patch('/:id', checkAbility('update', 'User'), controller.update);

/* DELETE user by id. */
router.delete('/:id', checkAbility('delete', 'User'), controller.destroy);

module.exports = router;
