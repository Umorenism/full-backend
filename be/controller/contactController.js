const asyncHandler = require("express-async-handler") //note this must be install using npm i express-async-handler
const Contact = require('../model/contactModel')

// @des get all contact
// @route get /api/contacts
// @access private
const getContact = asyncHandler(async(req,res)=>{
    const contacts =await Contact.find({user_id:req.user.id});
    
    res.status(2000).json(contacts)
})


// @des get by id contact
// @route get /api/contacts/:id
// @access private
const getContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(2000).json(contact)
})



// @des create new contact
// @route post /api/contacts
// @access private

const createContact = asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are required")
    }
    const contact = await Contact.create(
      {
        name,
        email,
        phone,
        user_id:req.user.id
      })
    res.status(201).json(contact)
})



// @des update  contact
// @route post /api/contacts/:id
// @access private

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update user contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(2000).json(updatedContact)
})

// @des delete  contact
// @route post /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async(req,res)=>{
const contact = await Contact.findById(req.params.id);
if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to delete user contact")
}
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
   await Contact.deleteOne({_id:req.params.id});
    res.status(2000).json(contact )
})


module.exports = {getContact,getContacts,updateContact,deleteContact,createContact}