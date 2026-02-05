function markAttendance() {
  const studentId = document.getElementById("studentId").value;
  const result = document.getElementById("result");

  if (!studentId) {
    result.innerText = "Please enter Student ID";
    return;
  }

  fetch("/mark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ studentId })
  })
    .then(res => res.json())
    .then(data => {
      result.innerText = data.message;
    })
    .catch(error => {
      result.innerText = "Error marking attendance";
    });
}
