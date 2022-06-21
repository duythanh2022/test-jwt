const authController = require('../controllers/authControllers')

const router = require('express').Router();

router.post("/register",authController.registerUer)
router.post("/login",authController.loginUser)

module.exports = router