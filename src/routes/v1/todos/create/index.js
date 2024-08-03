const { ToDo } = require('../schema/todo');

const create = async (req, res) => {
  const { task, task_details } = req.body;

  const todo = new ToDo({ task, task_details, completed: false });
  const result = await todo.save();

  res
    .status(201)
    .json({ msg: 'Created successfully!', status: true, data: [result] });
};

module.exports = create;
