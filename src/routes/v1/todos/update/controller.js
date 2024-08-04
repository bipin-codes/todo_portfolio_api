const { Model: ToDoModel } = require('../dbSchema');

const updateController = async (req, res) => {
  const { id, task, task_details, completed } = req.body;

  const result = await ToDoModel.findByIdAndUpdate(
    id,
    {
      task,
      task_details,
      completed,
      updated: Date.now(),
    },
    { new: true }
  );

  if (!result) {
    return res
      .status(404)
      .json({ message: 'No such task found!', status: false, data: [result] });
  }

  res
    .status(200)
    .json({ message: 'Updated successfully!', status: true, data: [result] });
};

module.exports = { updateController };
