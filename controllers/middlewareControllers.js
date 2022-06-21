const jwt = require("jsonwebtoken")

const middlewareController = {
    verifyToken: (req,res,next)=>{
        const token = req.header.token
        if(token){
            const accessToken = token.split(" ")[0]
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
    }
}
module.exports = middlewareController