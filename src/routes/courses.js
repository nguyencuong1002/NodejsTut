const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');
const upload = require('../app/middlewares/uploadMiddleware');

router.get('/create', coursesController.create);
router.post('/store', upload.single('thumbnail'), coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-action', coursesController.handleFormAction);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.forceDelete);
router.get('/:slug', coursesController.show);

module.exports = router;