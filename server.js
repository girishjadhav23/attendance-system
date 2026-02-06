const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

/* =====================
   MongoDB Connection
===================== */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* =====================
   Student Schema
===================== */
const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  class: String
});

const Student = mongoose.model("Student", studentSchema);

/* =====================
   Attendance Schema
===================== */
const attendanceSchema = new mongoose.Schema({
  studentId: String,
  date: String,
  time: String
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

/* =====================
   Mark Attendance (VERIFIED)
===================== */
app.post("/mark", async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.json({ message: "Student ID required" });
  }

  // 🔍 Verify student exists
  const student = await Student.findOne({ studentId });

  if (!student) {
    return res.json({ message: "Invalid Student ID ❌" });
  }

  const now = new Date();

  await Attendance.create({
    studentId,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  res.json({ message: `Attendance marked for ${studentId} ✅` });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
