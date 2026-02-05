const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// HOME ROUTE (THIS FIXES THE ERROR)
app.get("/", (req, res) => {
  res.send("Attendance Server is Running ✅");
});

// Example attendance route
app.post("/mark", (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID required" });
  }

  res.json({ message: `Attendance marked for ${studentId}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
