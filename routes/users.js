const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');


/* POST create user. */
router.post('/', controller.create);

/* GET users listing. */
router.get('/', controller.list);

/* GET user by id. */
router.get('/:id', controller.index);

/* PUT replace user by id. */
router.put('/:id', controller.replace);

/* PATCH update user by id. */
router.patch('/:id', controller.update);

/* DELETE user by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
