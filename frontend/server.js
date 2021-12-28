const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const port = process.env.PORT || 3000;

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

app.listen(port, () =>
  console.log(`API is running on http://localhost:${port}`)
);
