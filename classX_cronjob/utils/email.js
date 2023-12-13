const nodemailer = require("nodemailer");
require("dotenv").config();

const emailSender = async (emailSubject, htmlMessage, receiverEmailAddress) => {
	try {
        let transporter;
		if (process.env.NODE_ENV === "production") {
			transporter =  nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: process.env.GMAIL_USER,
					pass: process.env.GMAIL_PASSWORD
				}
			});
		} else {
            transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_HOST_USER,
                    pass: process.env.EMAIL_HOST_PASSWORD
                }
            });    
        }

		const mailOptions = {
			from: `Sodiq Farhan <farhan@alt.com>`,
			to: receiverEmailAddress,
			subject: emailSubject,
			html: htmlMessage
		};

		const deliveryInfo = await transporter.sendMail(mailOptions);
		console.log(`Email sent: ${deliveryInfo.accepted}`);
		return deliveryInfo.accepted;
	} catch (error) {
		console.log(`Failed to send email: ${error}`);
	}
};

module.exports = emailSender;
