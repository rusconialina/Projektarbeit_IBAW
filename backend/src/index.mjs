import express from "express";
import connect from "./utils/db.mjs";
import bookRoutes from "./routes/book.routes.mjs";
import cors from "cors";

connect();

const app = express();
app.use(cors());

app.use(function (req, res, next) {
  console.log("Time:", Date.now());

  // logik

  next();
});

app.use("/login", (req, res) => {
  //login prüfen
  console.log(req);
  res.send({
    token: "test123",
  });
});
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);

//load routes
app.use("/", bookRoutes);
