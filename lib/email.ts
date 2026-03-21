// Email configuration for license delivery
// This uses a placeholder for email service - in production use SendGrid, Resend, or similar

interface LicenseEmailData {
  email: string;
  licenseKey: string;
  productName: string;
  planName: string;
  downloadLink: string;
  expiryDate?: string;
}

export async function sendLicenseEmail(data: LicenseEmailData) {
  try {
    // In production, implement with actual email service
    console.log('[Email Service] Sending license to:', data.email);

    const emailHtml = generateLicenseEmailHTML(data);

    // Placeholder for actual email service
    // Example with SendGrid:
    // const msg = {
    //   to: data.email,
    //   from: 'noreply@tokbuilding.com',
    //   subject: `Your ${data.productName} License Key`,
    //   html: emailHtml,
    // };
    // await sgMail.send(msg);

    console.log('[Email Service] License email template generated');
    console.log(emailHtml);

    return { success: true, sent: false, template: emailHtml };
  } catch (error) {
    console.error('[Email Service] Error sending license:', error);
    throw error;
  }
}

function generateLicenseEmailHTML(data: LicenseEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
          .content { padding: 30px; border: 1px solid #ddd; border-top: none; }
          .license-box { background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 14px; word-break: break-all; margin: 20px 0; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
          .footer { color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Thank You for Your Purchase!</h1>
            <p>Your license is ready to use</p>
          </div>

          <div class="content">
            <h2>Welcome to ${data.productName}</h2>
            <p>Thank you for choosing ${data.productName} (${data.planName} Plan). Your purchase is complete!</p>

            <h3>Your License Key</h3>
            <p>Keep this license key safe. You'll need it to activate ${data.productName}:</p>
            <div class="license-box">${data.licenseKey}</div>

            <h3>Download Your App</h3>
            <p>Ready to get started? Download ${data.productName} now:</p>
            <a href="${data.downloadLink}" class="button">Download ${data.productName}</a>

            <h3>Need Help?</h3>
            <ul>
              <li><strong>Installation:</strong> See our <a href="https://docs.tokbuilding.com/install">installation guide</a></li>
              <li><strong>License Activation:</strong> Use your license key during app setup</li>
              <li><strong>Support:</strong> Email support@tokbuilding.com for assistance</li>
            </ul>

            ${data.expiryDate ? `
              <p style="color: #666; font-size: 12px;">
                <strong>License Expiry:</strong> ${data.expiryDate}
              </p>
            ` : ''}
          </div>

          <div class="footer">
            <p>© 2024 Kapa Personal Advocates. All rights reserved.</p>
            <p>This is a transaction email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    console.log('[Email Service] Sending welcome email to:', email);

    return { success: true };
  } catch (error) {
    console.error('[Email Service] Error sending welcome email:', error);
    throw error;
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderDetails: {
    orderId: string;
    productName: string;
    planName: string;
    amount: number;
    date: string;
  }
) {
  try {
    console.log('[Email Service] Sending order confirmation to:', email);

    const html = `
      <h2>Order Confirmation</h2>
      <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
      <p><strong>Product:</strong> ${orderDetails.productName} (${orderDetails.planName})</p>
      <p><strong>Amount:</strong> $${(orderDetails.amount / 100).toFixed(2)}</p>
      <p><strong>Date:</strong> ${orderDetails.date}</p>
    `;

    return { success: true, html };
  } catch (error) {
    console.error('[Email Service] Error sending confirmation:', error);
    throw error;
  }
}
