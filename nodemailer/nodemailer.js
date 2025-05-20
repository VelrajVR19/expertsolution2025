const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'expsoltechfeedback@gmail.com',     
      pass: 'faueuychtwddyrcg'
    }
  });

  const mailOptions = {
    from: 'expsoltechfeedback@gmail.com',
    to: 'velraja@expsoltechs.com',
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
