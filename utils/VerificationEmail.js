import nodemailer from 'nodemailer'

export const sendVerificationMail = async(toEmail,token)=>{
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"kashkataria786@gmail.com",
            pass:"qxav bnnd zwab gkgo"
        }
    });

    const verificationURL =`http://localhost:5000/verify-email/${token}`;

    const mailOptions = {
    from: '"Your App" <noreply@yourdomain.com>',
    to: toEmail,
    subject: 'Email Verification',
    html: `
      <h3>Verify Your Email</h3>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationURL}">${verificationURL}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}