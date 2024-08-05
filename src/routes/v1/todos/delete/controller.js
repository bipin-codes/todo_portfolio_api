const { Model: ToDoModel } = require('../dbSchema');

const deleteController = async (req, res) => {
  const { id } = req.body;
  try {
    await ToDoModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: 'Deleted successfully!', status: true, data: [{ id }] });
  } catch (error) {
    res.status(500).json({
      message: 'Error occured while trying to delete Todo',
      status: false,
      error: 'Database error',
    });
  }
};

module.exports = { deleteController };
