const userModel = require('../models/userModel')

// creating user document in database 
const createUser = async function (req, res) {
    try {
        let {fullName,mobileNumber,email,password,} = req.body;
        
        if (Object.keys(req.body).length<1) return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })

        let savedData = await userModel.create(req.body);
        
        return res.status(201).send({ status:true, data: savedData });
    }
    catch (err) {
        
        res.status(500).send({ msg: err.message })
    }

};


// get all users 
const getAllUsers = async function (req,res){
    try{
      
        let users = await userModel.find({isDeleted : false}).sort({createdAt:-1})    // showing last created first 

       return res.status(200).send({users})

    }catch(error){
        res.status(500).send({ msg: error.message })
    }
}

// for updating a user by id 
const updateUser = async function (req,res){
    try{
        let id = req.params.id
        let user = await userModel.findByIdAndUpdate({_id:id},{$set:data},{new:true})

        return res.status(200).send({user:user})

    }catch(error){
        res.status(500).send({ msg: error.message })
    }
}


// for deleting a user by id 
const deleteUser = async function (req,res){
    try{
        let id = req.params.id
        let user = await userModel.findByIdAndUpdate({_id:id},{isDeleted:true},{new:true})
        
       return  res.status(200).send({msg:"user deleted scucessfully !!!"})

    }catch(error){
        res.status(500).send({ msg: error.message })
    }
}



module.exports = {createUser,getAllUsers, updateUser , deleteUser}