const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, itemsController.getItems);
router.post("/", authenticateToken, itemsController.createItem);
router.delete("/", authenticateToken, itemsController.deleteItem);

module.exports = router;
