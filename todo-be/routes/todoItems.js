const router = require("express").Router();
const todoItemsController = require("../controllers/todoItemsController");

// add
router.post("/item", todoItemsController.addTodo);

// get all todo
router.get("/items", todoItemsController.getAllTodo);

// upadate todo
router.put("/item/:id", todoItemsController.updateTodo);

// delete todo
router.delete("/item/:id", todoItemsController.deleteTodo);

module.exports = router;