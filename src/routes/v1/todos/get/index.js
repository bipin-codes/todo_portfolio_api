const get = async (req, res) => {
  res
    .status(200)
    .json({ msg: 'Fetched successfully!', status: true, data: [] });
};

module.exports = { getTodos: get };
