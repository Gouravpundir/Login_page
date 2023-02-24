const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.post("/reg", userController.register);
router.post("/login", userController.login);
router.delete("/logout", userController.logout);
module.exports = router;