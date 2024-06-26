
const express = require('express');
const router= express.Router();

const {addMessage} = require("../controllers/messagesController.js");
const {getAllMessage} = require("../controllers/messagesController.js");
router.post('/addmsg/',addMessage);

router.post('/getmsg/',getAllMessage);
module.exports = router;
