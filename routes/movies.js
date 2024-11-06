const express = require('express');
const controller = require('../controllers/movies.controller');
const router = express.Router();

/* GET users listing. */
router.post('/', 
  controller.create
);
router.patch('/actor', 
  controller.addActor
);
router.get('/', 
  controller.list
);
router.get('/:id', 
  controller.index
);
router.put('/:id', 
  controller.replace
);
router.patch('/:id', 
  controller.update
);
router.delete('/:id', 
  controller.destroy
);

module.exports = router;
