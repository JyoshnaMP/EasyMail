// const nodemailer = require('nodemailer');

// // 1. Create transporter using real SMTP (Gmail example)
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'jyoshna.d@moonpreneur.com',        // your Gmail
//     pass: 'qmmp hrsp bmns gfzm'           // Gmail App Password
//   }
// });

// // 2. Define the email details
// let mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'friend@example.com',
//   subject: 'Hello from Node.js!',
//   text: 'This is a real email sent using Nodemailer and SMTP.'
// };

// // 3. Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Error:', error);
//   } else {
//     console.log('Email sent successfully:', info.response);
//   }
// });

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve HTML file

// Configure transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jyoshna.d@moonpreneur.com', // your Gmail
    pass: 'qmmp hrsp bmns gfzm'        // Gmail App Password
  }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { name, to, subject, message } = req.body;

  const mailOptions = {
    from: 'jyoshna.d@moonpreneur.com',
    to: to,
    subject: `${subject} (from ${name})`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ success: false, error: error.toString() });
    }
    res.json({ success: true });
  });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
