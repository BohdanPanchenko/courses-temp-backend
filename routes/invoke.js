const express = require("express");
const router = express.Router();
const invokeController = require("../controllers/invokeController");

router.get("/", invokeController.invokeServer);

module.exports = router;
