const { Model: ToDoModel } = require('../dbSchema');

const createController = async (req, res) => {
  const { task, task_details } = req.body;

  const todo = new ToDoModel({ task, task_details, completed: false });
  const result = await todo.save();

  res
    .status(201)
    .json({ message: 'Created successfully!', status: true, data: [result] });
};

module.exports = { createController };

// #   parameters:
//     #   - name: complete
//     #     in: query
//     #     required: false
//     #     schema:
//     #       $ref: '#/components/schemas/complete'
