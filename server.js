const express = require("express");
const QRCode = require("qrcode");

const app = express();

app.get("/qr", async (req, res) => {
  const data = "http://localhost:3000/attendance";

  try {
    const qrImage = await QRCode.toDataURL(data);
    res.send(`
      <h2>Scan this QR</h2>
      <img src="${qrImage}" />
    `);
  } catch (err) {
    res.send("Error generating QR");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});