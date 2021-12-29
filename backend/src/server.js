const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`API listening on http://localhost:${port}`)
);
