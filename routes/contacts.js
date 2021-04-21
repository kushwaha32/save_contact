



const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private

router.get('/', (req, res) => {
   res.send('Get all contacts');
});

// @route  POST api/contacts
// @desc   Add contact
// @access private

router.post('/', (req, res) => {
    res.send('add contacts ');
});


// @route   PUT api/contacts/:id
// @desc    Update contacts
// @access  Private

router.put('/:id', (req, res) => {
    res.send('Update contacts');

});


// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private

router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;

