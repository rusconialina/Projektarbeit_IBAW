import express from "express";
import connect from "./utils/db.mjs";
import bookRoutes from "./routes/book.routes.mjs";

connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);

//load routes
app.use("/", bookRoutes);
