import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER || 'inforesearchradar@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'pkqjncfsgdlwvjfm';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
});

export async function sendOtpEmail(toEmail: string, otpCode: string) {
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0e1318; padding: 30px; color: #ffffff; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid #38393c;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #00c4cc; font-size: 24px; margin: 0; font-weight: 800;">DocMaster Studio</h1>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 5px;">Account Email Verification</p>
      </div>

      <div style="background-color: #18191c; border: 1px solid #38393c; padding: 25px; border-radius: 12px; text-align: center;">
        <p style="font-size: 14px; color: #e2e8f0; margin-bottom: 15px;">Your 6-digit verification code is:</p>
        <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #00c4cc; background-color: #252627; padding: 12px 24px; border-radius: 10px; display: inline-block; border: 1px solid #00c4cc;">
          ${otpCode}
        </div>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">This code will expire in <b style="color: #f59e0b;">5 minutes</b>.</p>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #64748b;">
        If you did not request this verification code, please ignore this email.<br/>
        © 2026 DocMaster Studio • Full-Stack Studio
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"DocMaster Studio" <${emailUser}>`,
    to: toEmail,
    subject: `🔐 ${otpCode} is your DocMaster Verification Code`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ [OTP Email Sent] to ${toEmail} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`❌ [OTP Email Failed]:`, error.message);
    throw error;
  }
}

export interface FeedbackEmailPayload {
  rating: number;
  comments: string;
  designTitle: string;
  exportFormat: string;
  user: {
    name?: string;
    email?: string;
    username?: string;
  };
}

export async function sendFeedbackEmail(data: FeedbackEmailPayload) {
  const recipientEmail = 'inforesearchradar@gmail.com';
  const stars = '⭐'.repeat(data.rating);

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0e1318; padding: 30px; color: #ffffff; border-radius: 16px; max-width: 550px; margin: auto; border: 1px solid #38393c;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #00c4cc; font-size: 22px; margin: 0; font-weight: 800;">DocMaster Studio</h1>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">User Post-Export Feedback</p>
      </div>

      <div style="background-color: #18191c; border: 1px solid #38393c; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <div style="font-size: 22px; text-align: center; margin-bottom: 12px;">${stars} <span style="font-size: 14px; color: #f59e0b; font-weight: bold;">(${data.rating}/5 Stars)</span></div>
        
        <table style="width: 100%; font-size: 13px; color: #e2e8f0; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #252627;">
            <td style="padding: 8px 0; color: #94a3b8; width: 130px;">User Name:</td>
            <td style="padding: 8px 0; font-weight: bold;">${data.user.name || 'Anonymous User'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #252627;">
            <td style="padding: 8px 0; color: #94a3b8;">User Email:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #00c4cc;">${data.user.email || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #252627;">
            <td style="padding: 8px 0; color: #94a3b8;">Username:</td>
            <td style="padding: 8px 0;">@${data.user.username || 'user'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #252627;">
            <td style="padding: 8px 0; color: #94a3b8;">Design Title:</td>
            <td style="padding: 8px 0;">${data.designTitle || 'Untitled Design'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Export Format:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #a855f7;">${data.exportFormat.toUpperCase()}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #252627; border: 1px solid #38393c; padding: 18px; border-radius: 12px;">
        <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px;">User Comments & Feedback:</h4>
        <p style="font-size: 14px; color: #ffffff; line-height: 1.6; margin: 0; white-space: pre-wrap;">"${data.comments || 'No written comments provided.'}"</p>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #64748b;">
        Automated Feedback Dispatch • DocMaster Studio
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"DocMaster Feedback" <${emailUser}>`,
    to: recipientEmail,
    subject: `⭐ Feedback (${data.rating}/5 Stars) from ${data.user.name || 'User'} - DocMaster`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ [Feedback Email Sent] to ${recipientEmail} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`⚠️ [Feedback Email Network Notice]:`, error.message);
    console.log(`📌 [LOGGED FEEDBACK]: Rating: ${data.rating}/5 | User: ${data.user.email} | Comments: "${data.comments}"`);
    return { success: false, fallback: true, error: error.message };
  }
}
