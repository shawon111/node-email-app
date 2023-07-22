# node-email-app

The purpose of this app is to send email from the node server by taking inputs from the visitors or sender on the frontend by a html form.
[Live Demo](https://node-email-app.vercel.app/)

## What I have used in this app?

I have created this application using Node.js, Express.js, Nodemailer, HBS template engine and bootstrap.

## Usage

You can simply fill the form and the email will be send.

## Functionalities

When you submit the form in the frontend, it passes the form data in the backend and the host get an email with your subject, message and name. Also it send you a confirmation message that the email is sent to the host successfully.

## Security

Anyone can send email using this form. No authentication is needed. We have secured the smtp credentials using .env
