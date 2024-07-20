const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.post("/", itemsController.createItem);
router.delete("/", itemsController.deleteItem);

module.exports = router;
