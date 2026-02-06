const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// STUDENT MARK ATTENDANCE (NO DB)
app.post("/mark", (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.json({ message: "Student ID required" });
  }

  console.log("Attendance marked for:", studentId);

  res.json({ message: `Attendance marked for ${studentId}` });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
