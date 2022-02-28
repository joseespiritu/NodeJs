const Task = require("./models/task");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllTask: async () => {
      const tasks = await Task.find();
      return tasks;
    },
    getTask: async (_, args) => {
      const task = await Task.findById(args.id);
      return task;
    },
  },
  Mutation: {
    createTask: async (_, args) => {
      const { title, description } = args.task;
      const newTask = new Task({ title, description });
      await newTask.save();
      return newTask;
    },
    deleteTask: async (_, args) => {
      const { id } = args;
      await Task.findByIdAndDelete(id);
      return "Task Deleted";
    },
    updateTask: async (_, { task, id }) => {
      const taskUpdated = await Task.findByIdAndUpdate(
        id,
        {
          $set: task,
        },
        {
          new: true,
        }
      );
      return taskUpdated;
    },
  },
};

module.exports = {
  resolvers,
};
