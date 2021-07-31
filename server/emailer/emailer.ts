import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendPasswordReset(
	email: string,
	name: string,
	key: string,
	signUp: boolean
) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	const emailBody = signUp
		? {
				subject: "Timesheet Account Creation",
				text:
					`Hello ${name},\n
				Please follow this link to complete your registration to the Riverside Grammar School Timesheet.\n
				localhost:3000/resetPassword/` + key,
		  }
		: {
				subject: "Reset your Timesheet password",
				text:
					`Hello ${name},\n
				Please follow this link to reset your password to the Riverside Grammar School Timesheet.\n
				http://localhost:3000/user/resetPassword/` + key,
		  };

	// send mail with defined transport object
	let info = await transporter.sendMail({
		...{
			from: "Riverside Grammar School Timesheet <no-reply@eamon.tech>", // sender address
			to: email, // list of receivers
		},
		...emailBody,
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
