const express = require('express');
const router  =  express.Router();
const blog  = require('../controller/blog.controller');
const checkAuth =  require('../middleware/checkAuth')

router.post('/',checkAuth, blog.createBlog);
router.get('/', blog.getBlog);
router.get('/:id', blog.getBlogById)
router.put('/:id', checkAuth, blog.update)
router.delete('/:id', checkAuth, blog.deleteBolg)
module.exports =  router;