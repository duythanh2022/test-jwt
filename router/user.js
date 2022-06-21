const router = require("express").Router();

const middlewareController = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");
//GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUser);

//DELETE USER
router.delete("/:id", userController.deleteUser);
module.exports = router;

const input = [
  {
    name: "thanh",
    id: 1,
    gender: "nam",
  },
  {
    name: "kieu",
    id: 2,
    gender: "nu",
  },
  {
    name: "tu",
    id: 3,
    gender: "nam",
  },
];
const output = input.reduce((item,index)=>{
    if(index.gender === "nam"){
        item.push({
            human : index.name + index.id,
            gender: "nam"
        })
    }
    return item
},[])
console.log("th",output)