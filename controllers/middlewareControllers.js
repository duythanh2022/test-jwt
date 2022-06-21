const jwt = require("jsonwebtoken")

const middlewareController = {
    verifyToken: (req,res,next)=>{
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(error,user)=>{
                if(error){
                    res.status(403).json("token not value")
                }
                req.user = user 
                next();
            })
        }else{
            res.status(401).json("token not author")
        }
    },
    verifyTokenAndAdmin: (req,res,next)=>{
      middlewareController.verifyToken(req,res, ()=>{
        if(req.user.id == req.params.id || req.user.admin){
            next()
        }else{
            res.status(401).json("eeeeee")
        }
      })
    }
}
module.exports = middlewareController