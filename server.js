const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

/* =======================
   MongoDB Connection
======================= */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

/* =======================
   Schema & Model
======================= */
const attendanceSchema = new mongoose.Schema({
  studentId: String,
  date: String,
  time: String
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

/* =======================
   Routes
======================= */
app.post("/mark", async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ message: "Student ID required" });
    }

    const now = new Date();

    await Attendance.create({
      studentId,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    });

    res.json({ message: "Attendance marked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/records", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ _id: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
