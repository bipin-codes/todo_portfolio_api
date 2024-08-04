const { Model: ToDoModel } = require('../dbSchema');

const deleteController = async (req, res) => {
  const { id } = req.body;

  await ToDoModel.findByIdAndDelete(id);

  res
    .status(200)
    .json({ message: 'Deleted successfully!', status: true, data: [{ id }] });
};

module.exports = { deleteController };
