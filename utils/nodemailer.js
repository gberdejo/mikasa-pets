const nodemailer = require("nodemailer");

async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.sa-east-1.amazonaws.com",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "AKIATQLYNOLC6XPUWH5C",
        pass: "BP64enrfSWxxDVMG0Nl03Pywx1Jronin6HXe9c6FyG5t",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <zerefrev17x@gmail.com>', // sender address
      to: "gabriel.berdejo@holinsys.pe", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return info;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  sendEmail,
};
