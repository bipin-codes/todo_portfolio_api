const getController = async (req, res) => {
  res.send({ status: 200, msg: 'service ok' });
};

module.exports = { getController };
