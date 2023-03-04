const mongoose = require("mongoose");

const todoItemsSchema = new mongoose.Schema({
    item: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Todo", todoItemsSchema);