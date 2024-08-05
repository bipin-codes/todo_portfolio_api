const { Model: ToDoModel } = require('../dbSchema');

const buildQuery = ({ completed }) => {
  let query = {};

  if (completed) query.completed = completed;
  return query;
};

const getController = async (req, res) => {
  const { limit, page } = req.query;
  let query = buildQuery(req.query);
  let size = limit ?? 10;
  let skip = page ? page * size : 0;
  try {
    const result = await ToDoModel.find(query).skip(skip).limit(size);
    res
      .status(200)
      .json({ message: 'Fetched successfully!', status: true, data: result });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching todos',
      status: false,
      error: error.message,
    });
  }
};

module.exports = { getController };
