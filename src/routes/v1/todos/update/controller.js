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
  console.log(result);
  res
    .status(200)
    .json({ message: 'Updated successfully!', status: true, data: [result] });
};

module.exports = { updateController };
