const { Model: ToDoModel } = require('../dbSchema');

const buildQuery = ({ completed }) => {
  let query = {};

  if (completed) query.completed = completed;
  return query;
};

const get = async (req, res) => {
  const { limit, page } = req.query;
  let query = buildQuery(req.query);
  let size = limit ?? 10;
  let skip = page ? page * size : 0;

  const result = await ToDoModel.find(query).skip(skip).limit(size);
  res
    .status(200)
    .json({ message: 'Fetched successfully!', status: true, data: result });
};

module.exports = { getController: get };
