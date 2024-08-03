const create = async (req, res) => {
  console.log(req.body);

  res
    .status(201)
    .json({ msg: 'Created successfully!', status: true, data: [] });
};

module.exports = create;
