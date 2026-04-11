// Email service with SendGrid integration
// Brand-aware email system mirroring SVL agent architecture

import { getBrandEmailConfig } from './email-config';

interface LicenseEmailData {
  brand?: string;
  email: string;
  licenseKey: string;
  productName: string;
  planName: string;
  downloadLink: string;
  expiryDate?: string;
  recipientName?: string;
}

interface OrderConfirmationData {
  brand?: string;
  email: string;
  recipientName?: string;
  orderId: string;
  productName: string;
  planName: string;
  amount: number;
  date: string;
  downloadLink?: string;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error';
}

async function sendEmailViaSendGrid(
  to: string,
  from: string,
  fromName: string,
  subject: string,
  html: string
): Promise<{ success: boolean; messageId?: string; message?: string }> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log(`[Email Service] DEMO MODE - Would send email:`);
    console.log(`  From: ${fromName} <${from}>`);
    console.log(`  To: ${to}`);
    console.log(`  Subject: ${subject}`);
    return { success: true, message: 'Demo mode - email logged' };
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from, name: fromName },
        subject,
        content: [{ type: 'text/html', value: html }],
        trackingSettings: {
          clickTracking: { enabled: true },
          openTracking: { enabled: true },
        },
      }),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      console.error('[Email Service] SendGrid error:', responseBody);
      return { success: false, message: responseBody };
    }

    console.log('[Email Service] Email sent:', response.status);
    return {
      success: response.status === 202,
      messageId: response.headers.get('x-message-id') || undefined,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[Email Service] SendGrid error:', message);
    return { success: false, message };
  }
}

// Utility to adjust color brightness
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

export async function sendLicenseEmail(data: LicenseEmailData) {
  try {
    const brand = data.brand || 'svl';
    const brandConfig = getBrandEmailConfig(brand);

    console.log('[Email Service] Sending license to:', data.email);

    const emailHtml = generateLicenseEmailHTML({
      ...data,
      brandColor: brandConfig.brandColor,
    });

    const result = await sendEmailViaSendGrid(
      data.email,
      brandConfig.senderEmail,
      brandConfig.senderName,
      `Your ${data.productName} License Key`,
      emailHtml
    );

    return { ...result, template: emailHtml };
  } catch (error) {
    console.error('[Email Service] Error sending license:', error);
    throw error;
  }
}

function generateLicenseEmailHTML(data: LicenseEmailData & { brandColor?: string }): string {
  const brandColor = data.brandColor || '#667eea';
  const greeting = data.recipientName ? `Hi ${data.recipientName},` : 'Hi there,';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; background: #f9fafb; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(brandColor, -20)} 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; }
          .license-box { background: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid ${brandColor}; font-family: monospace; font-size: 14px; word-break: break-all; margin: 20px 0; }
          .button { display: inline-block; background: ${brandColor}; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin: 20px 0; font-weight: bold; }
          .button:hover { opacity: 0.9; }
          .footer { color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; }
          h2 { color: ${brandColor}; margin-top: 0; }
          h3 { color: #1f2937; margin-top: 20px; }
          a { color: ${brandColor}; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎉 Your License is Ready!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase</p>
          </div>

          <div class="content">
            <p>${greeting}</p>
            <p>Thank you for choosing <strong>${data.productName}</strong> (${data.planName} Plan). Your purchase is complete and your license is ready to activate.</p>

            <h3>Your License Key</h3>
            <p>Keep this key safe—you'll need it to activate ${data.productName}:</p>
            <div class="license-box">${data.licenseKey}</div>

            <h3>Get Started</h3>
            <p>Ready to begin? Download ${data.productName} and activate with your license key:</p>
            <center>
              <a href="${data.downloadLink}" class="button">Download Now</a>
            </center>

            <h3>Need Help?</h3>
            <ul>
              <li><a href="https://docs.tokbuilding.com/install">Installation Guide</a></li>
              <li><a href="https://docs.tokbuilding.com/activate">License Activation</a></li>
<<<<<<< HEAD
              <li>Email: support@sandersvioprolabsllc.com</li>
=======
              <li>Email: support@sandersvioprolabs.com</li>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
            </ul>

            ${data.expiryDate ? `<p style="color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 15px;"><strong>License Valid Until:</strong> ${data.expiryDate}</p>` : ''}
          </div>

          <div class="footer">
<<<<<<< HEAD
            <p>© 2026 Sanders Viopro Labs LLC. Mission: Keeping People Alive.</p>
=======
            <p>© 2026 Sanders Viopro Labs. Mission: Keeping People Alive.</p>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
            <p>This is a transaction email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateWelcomeEmailHTML(data: {
  name: string;
  brandName: string;
  brandColor: string;
  website: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; background: #f9fafb; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${data.brandColor} 0%, ${adjustBrightness(data.brandColor, -20)} 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: ${data.brandColor}; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin: 20px 0; font-weight: bold; }
          .footer { color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; }
          h2 { color: ${data.brandColor}; margin-top: 0; }
          a { color: ${data.brandColor}; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Welcome to ${data.brandName}! 👋</h1>
          </div>

          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>Welcome to <strong>${data.brandName}</strong>! We're thrilled to have you join our community.</p>

            <p>You now have access to all the features and benefits that make ${data.brandName} special. Whether you're here for wellness, safety, business, or support—we're committed to helping you every step of the way.</p>

            <h3>What's Next?</h3>
            <ul>
              <li><a href="${data.website}">Explore ${data.brandName}</a></li>
              <li><a href="https://docs.tokbuilding.com">Read our guides</a></li>
              <li>Connect with our community</li>
            </ul>

            <p>If you have any questions, don't hesitate to reach out. We're here to help!</p>

            <center>
              <a href="${data.website}" class="button">Get Started</a>
            </center>
          </div>

          <div class="footer">
<<<<<<< HEAD
            <p>© 2026 Sanders Viopro Labs LLC. Mission: Keeping People Alive.</p>
=======
            <p>© 2026 Sanders Viopro Labs. Mission: Keeping People Alive.</p>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
            <p>This is a transactional email. <a href="#">Manage preferences</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendWelcomeEmail(
  email: string,
  name?: string,
  brand: string = 'svl'
) {
  try {
    const brandConfig = getBrandEmailConfig(brand);
    console.log('[Email Service] Sending welcome email to:', email);

    const html = generateWelcomeEmailHTML({
      name: name || 'Friend',
      brandName: brandConfig.brand,
      brandColor: brandConfig.brandColor,
      website: brandConfig.website || 'https://tokbuilding.com',
    });

    const result = await sendEmailViaSendGrid(
      email,
      brandConfig.senderEmail,
      brandConfig.senderName,
      `Welcome to ${brandConfig.brand}`,
      html
    );

    return { ...result, template: html };
  } catch (error) {
    console.error('[Email Service] Error sending welcome email:', error);
    throw error;
  }
}

export async function sendOrderConfirmationEmail(
  data: OrderConfirmationData
) {
  try {
    const brand = data.brand || 'svl';
    const brandConfig = getBrandEmailConfig(brand);
    console.log('[Email Service] Sending order confirmation to:', data.email);

    const html = generateOrderConfirmationHTML({
      ...data,
      brandColor: brandConfig.brandColor,
      supportEmail: brandConfig.supportEmail,
      brandName: brandConfig.brand,
    });

    const result = await sendEmailViaSendGrid(
      data.email,
      brandConfig.senderEmail,
      brandConfig.senderName,
      `Order Confirmation: ${data.productName}`,
      html
    );

    return { ...result, template: html };
  } catch (error) {
    console.error('[Email Service] Error sending confirmation:', error);
    throw error;
  }
}

<<<<<<< HEAD
function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function generateOutreachEmailHTML(body: string): string {
  const safeBody = escapeHtml(body).replaceAll('\n', '<br />');
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #111827; background: #f3f4f6; }
          .container { max-width: 640px; margin: 0 auto; padding: 24px; }
          .card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }
          .meta { color: #6b7280; font-size: 12px; margin-top: 18px; border-top: 1px solid #e5e7eb; padding-top: 12px; }
          .body { font-size: 15px; line-height: 1.7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="body">${safeBody}</div>
            <div class="meta">Sent via Sanders Viopro Labs Outreach Command</div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendOutreachEmail(data: OutreachEmailData) {
  const brand = data.brand || 'svl';
  const brandConfig = getBrandEmailConfig(brand);
  const html = generateOutreachEmailHTML(data.body);

  return sendEmailViaSendGrid(
    data.to,
    brandConfig.senderEmail,
    brandConfig.senderName,
    data.subject,
    html
  );
}

=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
function generateOrderConfirmationHTML(data: OrderConfirmationData & {
  brandColor?: string;
  supportEmail?: string;
  brandName?: string;
}): string {
  const brandColor = data.brandColor || '#667eea';
  const greeting = data.recipientName ? `Hi ${data.recipientName},` : 'Thank you';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; background: #f9fafb; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(brandColor, -20)} 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; }
          .order-box { background: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid ${brandColor}; margin: 20px 0; }
          .order-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .order-row:last-child { border-bottom: none; }
          .label { color: #6b7280; font-weight: 600; }
          .value { color: #1f2937; text-align: right; }
          .button { display: inline-block; background: ${brandColor}; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin: 20px 0; font-weight: bold; }
          .footer { color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; }
          h2 { color: ${brandColor}; margin-top: 0; }
          a { color: ${brandColor}; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">✓ Order Confirmed!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase</p>
          </div>

          <div class="content">
            <h2>${greeting}</h2>
            <p>Your order has been confirmed and we're processing it right away. Here's a summary of your purchase:</p>

            <div class="order-box">
              <div class="order-row">
                <span class="label">Order ID</span>
                <span class="value">${data.orderId}</span>
              </div>
              <div class="order-row">
                <span class="label">Product</span>
                <span class="value">${data.productName}</span>
              </div>
              <div class="order-row">
                <span class="label">Plan</span>
                <span class="value">${data.planName}</span>
              </div>
              <div class="order-row">
                <span class="label">Amount</span>
                <span class="value" style="font-weight: bold; color: ${brandColor};">$${(data.amount / 100).toFixed(2)}</span>
              </div>
              <div class="order-row">
                <span class="label">Date</span>
                <span class="value">${data.date}</span>
              </div>
            </div>

            ${data.downloadLink ? `
            <h3>Download Your Product</h3>
            <center>
              <a href="${data.downloadLink}" class="button">Download Now</a>
            </center>
            ` : ''}

            <h3>What Happens Next?</h3>
            <ol>
              <li>You'll receive a license key shortly</li>
              <li>Download and install ${data.productName}</li>
              <li>Activate using your license key</li>
              <li>Start using your new product</li>
            </ol>

            <h3>Need Help?</h3>
            <p>If you have any questions about your order or need support, reach out to us:</p>
            <ul>
<<<<<<< HEAD
              <li>Email: ${data.supportEmail || 'support@sandersvioprolabsllc.com'}</li>
=======
              <li>Email: ${data.supportEmail || 'support@sandersvioprolabs.com'}</li>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
              <li><a href="https://docs.tokbuilding.com">Documentation</a></li>
            </ul>
          </div>

          <div class="footer">
<<<<<<< HEAD
            <p>© 2026 Sanders Viopro Labs LLC. Mission: Keeping People Alive.</p>
=======
            <p>© 2026 Sanders Viopro Labs. Mission: Keeping People Alive.</p>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
            <p>This is a transactional email. <a href="#">Manage preferences</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}
