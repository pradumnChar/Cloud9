const express = require('express');
const router= express.Router();
const {register} = require("../controllers/userController.js");
const {login}  = require("../controllers/userController.js");
const {setAvatar} = require("../controllers/userController.js");
const {getAllUsers} = require("../controllers/userController.js");
const {logOut} = require("../controllers/userController.js");
router.post('/register',register);
router.post('/login',login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allusers/:id',getAllUsers);
router.get("/logout/:id", logOut);
module.exports = router;
