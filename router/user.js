const router = require("express").Router();

const middlewareController = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");
//GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUser);

//DELETE USER
router.delete("/:id",middlewareController.verifyTokenAndAdmin, userController.deleteUser);
module.exports = router;

