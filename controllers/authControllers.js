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
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "50s",
          }
        );
        res.status(200).json({user,accessToken});
      }
    } catch (error) {
      res.status(500).json(error);
      console.log("sw", error.message);
    }
  },
};
module.exports = authController;
