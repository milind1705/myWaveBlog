const express = require('express');
const router  =  express.Router();
const user = require('../controller/login.controller');
const checkAuth =  require('../middleware/checkAuth')

router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/auth', checkAuth, (req, res) => {
     
    return res.json("welcome")
})
module.exports =  router;