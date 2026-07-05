import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    
    // Save to DB
    const newLead = await Lead.create(data);
    
    // Attempt to send email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER || process.env.ADMIN_EMAIL,
          pass: process.env.SMTP_PASS, // Needs Google App Password in .env
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER || process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Lead: ${data.name} - FutureMap`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: #c5a059; margin: 0; font-size: 24px;">FutureMap</h1>
              <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px;">New Guidance Request Received</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #1a1a1a; font-size: 20px; margin-top: 0; border-bottom: 2px solid #e5e0d8; padding-bottom: 10px;">Student Details</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px;"><strong style="color: #666;">Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a1a; font-weight: bold;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #666;">Phone:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">
                    <a href="tel:${data.phone}" style="color: #c5a059; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #666;">Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">
                    <a href="mailto:${data.email}" style="color: #c5a059; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #666;">Current Class:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">${data.currentClass}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #666;">Domain:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">${data.domain}</td>
                </tr>
              </table>
              
              <h3 style="color: #1a1a1a; font-size: 16px; margin-top: 20px;">Message / Requirements</h3>
              <div style="background-color: #faf9f6; border-left: 4px solid #c5a059; padding: 15px; color: #444; font-style: italic; line-height: 1.5;">
                ${data.message || 'No additional message provided.'}
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="https://wa.me/91${data.phone.replace(/[^0-9]/g, '').slice(-10)}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Message on WhatsApp</a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
              This is an automated notification from your FutureMap portal.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We don't throw here because we still want to return success to the user since the lead was saved.
    }

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
