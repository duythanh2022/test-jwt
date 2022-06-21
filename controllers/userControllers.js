const User = require("../model/User");

const userController = {
    //get all users
    getAllUser: async (req,res)=>{
        try {
            const getUser = await User.find()
            res.status(200).json(getUser)
        } catch (error) {
            res.status(500).json(error)
        }
       
    },
    //delete user 
    deleteUser: async(req,res) =>{
        try {
            const data = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
      
    }
}
module.exports = userController;
