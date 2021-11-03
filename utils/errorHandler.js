module.exports = (err, req, res, next) => {
  if (err?.code === "42P01") {
    res.status(500).send({ message: "Internal Error" });
  } else if (err?.code === "3D000") {
    res.status(500).send({ message: "Database does not exist" });
  } else if (err?.code === "22P02") {
    res.status(400).send({ message: "Invalid Id" });
  } else if (err?.code === "42703") {
    res.status(400).send({ message: "Bad Query" });
  } else if (err?.code === "42601") {
    res.status(400).send({ message: "Bad Query" });
  } else {
    res.status(err.status).send({ message: err.message });
  }
};
