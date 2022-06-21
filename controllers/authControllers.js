const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const authController = {
  registerUer: async (req, res) => {
    try {
      const result = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, result);

      const createNewUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
      });
      console.log("thanbh", createNewUser);
      // const user = await createNewUser.save();
      res.status(200).json(createNewUser);
    } catch (error) {
      // console.log("aa",res.status(500).json(error) )      ;
      console.log("s", error.message);
    }
  },
  //generate access token
  generateAccessToken: (user)=>{
    jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "50d",
      }
    );
  },
  //generate refresh token
  generateRefreshToken :(user)=>{
    jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "50d",
      }
    );
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) {
        res.status(404).json("wrong user");
      }
      const userPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!userPassword) {
        res.status(404).json("wrong password");
      }
      if (user && userPassword) {
        const accessToken = authController.generateAccessToken
        const refreshToken = authController.generateRefreshToken
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          secure:false,
          sameSite: "strict",
          path: "/"
        })
        const {password, ...orthers} = user._doc
        res.status(200).json({...orthers,accessToken,refreshToken});
      }
    } catch (error) {
      res.status(500).json(error);
      console.log("sw", error.message);
    }
  },
  // request Refresh Token
    requestRefreshToken: async(req,res)=>{
      const refreshToken = req.cookies.refreshToken
      if(!refreshToken) return res.status(401).json("you not auth")
      jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY, (error,user)=>{
        if(error){
          console.log(error)
        }
        // create new token 
        const newAccessToken = authController.generateAccessToken(user)
        const newRefreshToken = authController.generateRefreshToken(user)
        res.cookie("refreshToken",newRefreshToken,{
          httpOnly:true,
          secure:false,
          sameSite: "strict",
          path: "/"
        })
        res.status(200).json({accessToken:newAccessToken})
      })
    }
};
module.exports = authController;
