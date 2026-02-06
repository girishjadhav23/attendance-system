const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

/* =========================
   MongoDB Connection
========================= */
mongoose.connect(
  "mongodb+srv://girishjadhav1414_db_user:<db_password>@cluster0.n8siehe.mongodb.net/?appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* =========================
   Attendance Schema
========================= */
const attendanceSchema = new mongoose.Schema({
  studentId: String,
  date: String,
  time: String
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

/* =========================
   MARK ATTENDANCE (STUDENT)
========================= */
app.post("/mark", async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID required" });
  }

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  await Attendance.create({
    studentId,
    date,
    time
  });

  res.json({ message: `Attendance marked for ${studentId}` });
});

/* =========================
   FETCH RECORDS (TEACHER)
========================= */
app.get("/records", async (req, res) => {
  const records = await Attendance.find().sort({ _id: -1 });
  res.json(records);
});

/* =========================
   SERVER START
========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
