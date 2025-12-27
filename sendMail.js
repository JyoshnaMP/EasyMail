

// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static(__dirname)); // Serve HTML file

// // Configure transporter
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'jyoshna.d@moonpreneur.com', // your Gmail
//     pass: 'qmmp hrsp bmns gfzm'        // Gmail App Password
//   }
// });

// // Endpoint to send email
// app.post('/send-email', (req, res) => {
//   const { name, to, subject, message } = req.body;

//   const mailOptions = {
//     from: 'jyoshna.d@moonpreneur.com',
//     to: to,
//     subject: `${subject} (from ${name})`,
//     text: message
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.json({ success: false, error: error.toString() });
//     }
//     res.json({ success: true });
//   });
// });

// // Start server
// app.listen(3000, () => console.log('Server running on http://localhost:3000'));


const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

// Serve index.html from root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// API
app.post('/send-email', async (req, res) => {
  const { name, to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: `${subject} (from ${name})`,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
