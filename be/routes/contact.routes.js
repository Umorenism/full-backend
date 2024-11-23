const express = require('express');
const router = express.Router()
const {getContacts, createContact, updateContact, deleteContact} = require("../controller/contactController");
const validateToken = require('../middleware/validateToken')

router.use(validateToken);
router.get('/',getContacts)
router.post('/',createContact)
router.get('/:id',getContacts)
router.put('/:id',updateContact)
router.delete('/:id',deleteContact)

module.exports = router;


