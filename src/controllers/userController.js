const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')






//====================================================user Login Api=======================================================================


const loginUser = async function (req, res) {

    try {
        if (Object.keys(req.body).length<1) return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })
        
        let email = req.body.email;
        if(!email) return res.status(400).send({status:false,msg:"enter email"})

        let password = req.body.password;
        if(!password) return res.status(400).send({status:false,msg:"enter password"})

        let user = await userModel.findOne({ $and:[{email: email}, {password: password }]});
        if (!user)  return res.status(401).send({
            
                status: false,
                msg: "email or the password is not correct",
            });
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                isAdmin:user.role
            },
            "recovero-assign"
        );
        return res.status(200).send({ status: true, accessToken: token ,isAdmin: user._doc.role});
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}




module.exports.loginUser = loginUser