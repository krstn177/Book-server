const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'christiangeshev@gmail.com',
            pass: process.env.GMAIL_PASS
    }
});

// Function to send a purchase confirmation email
function sendPurchaseConfirmationEmail(userEmail) {
    const mailOptions = {
            from: 'Мъдрости от Пепелта <christiangeshev@gmail.com>',
            to: userEmail,
            subject: 'Благодарим Ви за вашата поръчка',
            html: `<h1>Благодарим Ви, че закупихте книгата "Мъдрости от пепелта"</h1>
                <h2>Можете да очаквате вашата пратка на подаденият от Вас адрес на Speedy или Ekont</h2>
            `
    };

        transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            throw new Error(error);
        } else {
            console.log(info.messageId);
        }
    });
}

module.exports = {
    sendPurchaseConfirmationEmail
}