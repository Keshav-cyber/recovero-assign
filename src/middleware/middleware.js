const jwt = require("jsonwebtoken")


// midddleware for users 
const authenticate = function (req, res, next) {
    try {
      //checking if token is available
      let token = req.headers["authorization"]
      if (!token) return res.status(400).send({ status: false, msg: "token must be present" })
      //decoding token
      let decodedToken = jwt.verify(token, 'recovero-assign', function (err, decodedToken) {
      if (err) return res.status(400).send({ status: false, msg: "token is not valid or expired" })

        next()
      })
  
    } catch (err) {
      
      return res.status(500).send({ status: false, Error: err.message })
    }
  }


  // middleware for admin routes
  const isAdmin = function (req, res, next) {
    try {
      // checking if token is available
      let token = req.headers["authorization"]
      if (!token) return res.status(400).send({ status: false, msg: "token must be present" })
      //decoding token
      let decodedToken = jwt.verify(token, 'recovero-assign', function (err, decodedToken) {
        if (err) return res.status(400).send({ status: false, msg: "token is not valid or expired" })
        if(!decodedToken.isAdmin) return res.status(400).send({ status: false, msg: "Access Denied" })
        
        next()
      })
      
  
    } catch (err) {
      console.log(err)
      return res.status(500).send({ status: false, Error: err.message })
    }
  }



  module.exports = { authenticate , isAdmin }