const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

module.exports = model("Task", TaskSchema);
