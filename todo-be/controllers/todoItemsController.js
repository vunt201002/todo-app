const Todo = require("../models/todoItems");

const todoItemsController = {
    addTodo: async (req, res) => {
        try {
            const newItem = new Todo({
                item: req.body.item
            });

            const saveItem = await newItem.save();

            return res.status(200).json(saveItem);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllTodo: async (req, res) => {
        try {
            const allTodo = await Todo.find({});

            return res.status(200).json(allTodo);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    updateTodo: async (req, res) => {
        try {
            const updataItem = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body });

            return res.status(200).json(updataItem);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    deleteTodo: async (req, res) => {
        try {
            const deleteItem = await Todo.findByIdAndDelete(req.params.id);

            return res.status(200).json(deleteItem);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = todoItemsController;