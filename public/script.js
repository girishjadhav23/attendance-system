function markAttendance() {
    const studentId = document.getElementById("studentId").value;

    fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentId })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
    });
}