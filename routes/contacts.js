



const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private

router.get('/', auth, async (req, res) => {
   try{
      const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
      res.json(contacts);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

// @route  POST api/contacts
// @desc   Add contact  
// @access private

router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
]], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() });
    }

    const { name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
    }
});


// @route   PUT api/contacts/:id
// @desc    Update contacts
// @access  Private

router.put('/:id', auth, async (req, res) => {
     
   // 1> Error handling
   
  // const errors = validationResult(req);

  // if(!errors.isEmpty)
  //    return res.status(400).json({error: errors.array()});

   // 2> Extract fields and make contact field object

   const { name, email, phone, type } = req.body;

   const contactField = {};

   if(name) contactField.name = name;
   if(email) contactField.email = email;
   if(phone) contactField.phone = phone;
   if(type) contactField.type = type;

   try {
        // 3> Find the contact from the databse via req.params.id
        
        const contact = await Contact.findById(req.params.id);
        if(!contact)
          return res.status(404).json({ msg: "Contact does not exist" });

          
        // 4> Make sure user owns the contact
         if(contact.user.toString() !== req.user.id)
           return res.status('400').json({ msg: "Not authorized "});
        
        
        // 5> Update the contact at the database
        const upContact = await Contact.findByIdAndUpdate(id, { $set: contactField }, { new:true });
        return res.send(upContact);
   } catch (err) {
       console.error(err.message);
       return res.status(500).json({ msg: "Server Error"});
   }
});


// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private

router.delete('/:id', auth, 
   async (req, res) => {

   // 1> Validation error handling

   try {
       // 2> Find by id from the data base

       const id = req.params.id;
       
       let contact = await Contact.findById(id);
      
       // 3> Make sure user owns the contact 
       
       if(contact.user.toString() !== req.user.id)
          return res.status(404).json({ msg: "Not authorized "});


     
      // 4> Delete the contact
       
      await Contact.findByIdAndRemove(id);
      
      
      return res.json({ msg: "contact deleted successfully"});



   } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "server Error"});
   }

});

module.exports = router;

