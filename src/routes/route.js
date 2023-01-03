const express = require('express')
const router = express.Router()


let {loginUser} = require('../controllers/userController')
let {createUser, getAllUsers, updateUser , deleteUser} = require('../controllers/adminController')
let { authenticate ,isAdmin} = require('../middleware/middleware')

//users
router.post("/login", loginUser) 


//admin 
router.post("/addUser",isAdmin, createUser)  
router.get("/users",isAdmin,getAllUsers)
router.put("/user/:id" , isAdmin,updateUser)
router.delete("/user/:id" , isAdmin, deleteUser)


module.exports = router