const express = require("express");
const router = express.Router();
const userModule = require("../modules/userModule");

router.get("/get", userModule.get);

router.get("/get/:userId", userModule.getone);

router.put("/edit/:userId", userModule.edit);

router.delete("/delete/:userId", userModule.delete);

module.exports = router;
