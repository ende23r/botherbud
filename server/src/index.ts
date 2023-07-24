import * as express from "express";

const PORT = process.env.PORT;
const app = express();

app.get("/statusy", (req, res) => {
  console.log("Health check");
  res.send(`Healthy! Serving on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Botherbud server listening on port ${PORT}`);
});

