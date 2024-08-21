module.exports = (req, res, next) => {
  console.log(
    `At ${new Date().toISOString()}, Path: ${req.url}, Body: ${JSON.stringify(
      req.body
    )}, Query: ${JSON.stringify(req.query)}`
  );
  next();
};
