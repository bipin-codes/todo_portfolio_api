module.exports = async (req, res) => {
  res.status(200).json({ msg: 'okay', version: 'v2' });
};
