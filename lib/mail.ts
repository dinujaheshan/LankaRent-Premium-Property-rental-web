import nodemailer from 'nodemailer';

// Extract environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || '"LankaRent" <no-reply@lankarent.com>';

// Check if credentials are set and not defaults
const isRealSMTPConfigured =
  SMTP_HOST &&
  SMTP_USER &&
  SMTP_USER !== 'your-email@gmail.com' &&
  SMTP_PASS &&
  SMTP_PASS !== 'your-app-password';

// Initialize nodemailer transporter if configured
let transporter: nodemailer.Transporter | null = null;
if (isRealSMTPConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for others
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

/**
 * Generic mail sender that falls back to console logging in development
 */
async function sendMailHelper(to: string, subject: string, html: string, text: string) {
  if (transporter) {
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        text,
        html,
      });
      console.log(`[SMTP] Email successfully sent to: ${to}`);
      return true;
    } catch (error) {
      console.error('[SMTP Error] Failed to send email via SMTP. Falling back to console logging.', error);
    }
  }

  // Fallback / Mock Logging
  console.log('\n========================================================================');
  console.log(`[MOCK EMAIL SENT]`);
  console.log(`To:      ${to}`);
  console.log(`From:    ${SMTP_FROM}`);
  console.log(`Subject: ${subject}`);
  console.log('------------------------------------------------------------------------');
  console.log(`Text Body:\n${text}`);
  console.log('------------------------------------------------------------------------');
  console.log(`HTML Body Preview (First 800 chars):\n${html.slice(0, 800)}...`);
  console.log('========================================================================\n');
  return true;
}

/**
 * Send rental application confirmation email to the applicant
 */
export async function sendApplicationConfirmationEmail(
  to: string,
  applicantName: string,
  propertyTitle: string,
  monthlyRate: number
) {
  const subject = `Application Received: ${propertyTitle}`;
  
  const text = `Hi ${applicantName},\n\nThank you for applying for "${propertyTitle}" on LankaRent. We have received your rental application and it is currently "Under Review" by our screening team.\n\nApplication Details:\n- Property: ${propertyTitle}\n- Monthly Rate: LKR ${monthlyRate.toLocaleString()}\n- Status: Under Review\n\nWe will review your gross income and details and keep you updated on the progress.\n\nBest regards,\nLankaRent Team`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #050d24; color: #ffffff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background-color: #0b1437; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #050d24 0%, #0B1437 100%); padding: 30px; text-align: center; border-bottom: 2px solid #F5A623; }
          .logo { font-size: 24px; font-weight: 800; color: #ffffff; text-decoration: none; }
          .logo span { color: #F5A623; }
          .content { padding: 40px 30px; line-height: 1.6; }
          h1 { font-size: 20px; color: #ffffff; margin-top: 0; }
          p { color: rgba(255, 255, 255, 0.7); font-size: 14px; }
          .details-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin: 25px 0; }
          .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
          .details-row:last-child { border-bottom: none; }
          .label { color: rgba(255, 255, 255, 0.4); font-size: 13px; }
          .value { color: #ffffff; font-weight: 600; font-size: 13px; }
          .value.gold { color: #F5A623; }
          .badge { display: inline-block; background-color: rgba(245, 166, 35, 0.15); color: #F5A623; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; border: 1px solid rgba(245, 166, 35, 0.25); }
          .footer { background: rgba(5, 13, 36, 0.5); padding: 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); }
          .footer-text { color: rgba(255, 255, 255, 0.3); font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Lanka<span>Rent</span></div>
          </div>
          <div class="content">
            <h1>Rental Application Received</h1>
            <p>Hi ${applicantName},</p>
            <p>Thank you for submitting your rental application on LankaRent. Our team has received it and it is currently being processed by our admin screening panel.</p>
            
            <div class="details-card">
              <div class="details-row">
                <div class="label">Property Title</div>
                <div class="value">${propertyTitle}</div>
              </div>
              <div class="details-row">
                <div class="label">Monthly Rental Rate</div>
                <div class="value gold">LKR ${monthlyRate.toLocaleString()}</div>
              </div>
              <div class="details-row">
                <div class="label">Current Status</div>
                <div class="value"><span class="badge">Under Review</span></div>
              </div>
            </div>
            
            <p>We will verify your submitted documents and references. We'll send you another notification once there is an update on your application status.</p>
            <p>If you have any questions in the meantime, feel free to reply directly to this email.</p>
          </div>
          <div class="footer">
            <div class="footer-text">&copy; ${new Date().getFullYear()} LankaRent. All rights reserved.</div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMailHelper(to, subject, html, text);
}

/**
 * Send inquiry response email to the customer
 */
export async function sendInquiryReplyEmail(
  to: string,
  customerName: string,
  originalMessage: string,
  replyMessage: string
) {
  const subject = `Re: LankaRent Inquiry Response`;

  const text = `Hi ${customerName},\n\nThis is a response to your inquiry on LankaRent.\n\nOriginal Message:\n"${originalMessage}"\n\nAdmin Reply:\n${replyMessage}\n\nBest regards,\nLankaRent Support`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #050d24; color: #ffffff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background-color: #0b1437; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #050d24 0%, #0B1437 100%); padding: 30px; text-align: center; border-bottom: 2px solid #F5A623; }
          .logo { font-size: 24px; font-weight: 800; color: #ffffff; text-decoration: none; }
          .logo span { color: #F5A623; }
          .content { padding: 40px 30px; line-height: 1.6; }
          h1 { font-size: 20px; color: #ffffff; margin-top: 0; }
          p { color: rgba(255, 255, 255, 0.7); font-size: 14px; }
          .msg-block { background: rgba(255, 255, 255, 0.02); border-left: 3px solid rgba(255, 255, 255, 0.15); padding: 12px 18px; margin: 15px 0; border-radius: 0 8px 8px 0; font-style: italic; color: rgba(255,255,255,0.5); font-size: 13px; }
          .reply-block { background: rgba(245, 166, 35, 0.03); border-left: 3px solid #F5A623; padding: 18px; margin: 20px 0; border-radius: 0 12px 12px 0; color: #ffffff; font-size: 14px; line-height: 1.6; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .footer { background: rgba(5, 13, 36, 0.5); padding: 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); }
          .footer-text { color: rgba(255, 255, 255, 0.3); font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Lanka<span>Rent</span></div>
          </div>
          <div class="content">
            <h1>Inquiry Response</h1>
            <p>Hi ${customerName},</p>
            <p>We have received your message, and a System Administrator has sent you a response:</p>
            
            <div class="reply-block">
              <strong>Response:</strong><br/>
              ${replyMessage.replace(/\n/g, '<br/>')}
            </div>

            <div class="msg-block">
              <strong>Your Original Message:</strong><br/>
              "${originalMessage}"
            </div>

            <p>You can reply directly to this email thread if you require further assistance.</p>
          </div>
          <div class="footer">
            <div class="footer-text">&copy; ${new Date().getFullYear()} LankaRent. All rights reserved.</div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMailHelper(to, subject, html, text);
}
