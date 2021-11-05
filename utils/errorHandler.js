module.exports = (err, _req, res, _next) => {
  switch (err.code) {
    case "42P01":
      res.status(500).send({ message: "Internal Error" });
      break;
    case "3D000":
      res.status(500).send({ message: "Database does not exist" });
      break;
    case "22P02":
      res.status(400).send({ message: "Invalid Id" });
      break;
    case "42703":
      res.status(400).send({ message: "Bad Query" });
      break;
    case "42601":
      res.status(400).send({ message: "Bad Query" });
      break;
    default:
      res.status(err.status).send({ message: err.message });
  }
};
