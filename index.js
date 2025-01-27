require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");
const { urlencoded, json } = require("body-parser");
const { PORT } = process.env.PORT || 5000;

//defaultnya express js itu ga menerima semua jenis form.
// use() middleware urlencoded, json
app.use(cors());
//menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
//untuk menerima images
app.use(express.static("src"));
//menerima json
const corsOptions = {
  origin: ["http://localhost:5000", "http://192.168.1.10:5000"],
  allowHeaders: ["x-access-token", "content-type"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};
app.use(json());
// app.use(cors(corsOptions));

app.use("/api/v1/", router);

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});
app.listen(6144, () => {
  console.log(`backend succesly running on port 6144`);
});
