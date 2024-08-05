const { Model: ToDoModel } = require('../dbSchema');

const createController = async (req, res) => {
  const { task, task_details } = req.body;

  const todo = new ToDoModel({ task, task_details, completed: false });
  try {
    const result = await todo.save();
    res
      .status(201)
      .json({ message: 'Created successfully!', status: true, data: [result] });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while creating the todo.',
      status: false,
      error: error.message,
    });
  }
};

module.exports = { createController };
