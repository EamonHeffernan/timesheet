/*
 * @Script: emailer.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 02:36:07
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:41:01
 * @Description: Handles emailing users.
 */

import nodemailer from "nodemailer";

import logger from "../logger";

/**
 * Send an email to a user with a password reset link.
 * Is formatted based on whether the recipient is a new user
 * @param email Recipient Email
 * @param name Recipient Name
 * @param key Key to send
 * @param signUp Has the user just signed up?
 */
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
				http://localhost:5000/user/reset-password/` + key,
		  }
		: {
				subject: "Reset your Timesheet password",
				text:
					`Hello ${name},\n
				Please follow this link to reset your password to the Riverside Grammar School Timesheet.\n
				http://localhost:5000/user/reset-password/` + key,
		  };

	// send mail with defined transport object
	let info = await transporter.sendMail({
		...{
			from: "Riverside Grammar School Timesheet <no-reply@eamon.tech>", // sender address
			to: email, // list of receivers
		},
		...emailBody,
	});

	logger(`Message sent: ${info.messageId}`);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	logger(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
