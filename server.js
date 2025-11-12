// unknowntracker/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let clicks = [];

app.post("/api/track-click", (req, res) => {
  const { uid } = req.body;
  const info = {
    uid,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    time: new Date().toISOString(),
  };
  clicks.push(info);
  console.log("🔹 New click tracked:", info);
  res.json({ message: "Click tracked" });
});

app.get("/admin/stats", (req, res) => {
  res.json(clicks);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
