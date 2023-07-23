import * as express from "express";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  console.log("Processing request");
  res.send("Success!");
});

app.listen(PORT, () => {
  console.log(`Botherbud server listening on port ${PORT}`);
});

