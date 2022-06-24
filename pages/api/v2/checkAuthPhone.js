export default (req, res) => {
  const { phone } = req.body;
  console.log(req.body);
  res.json(req);
};
