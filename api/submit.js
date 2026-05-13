const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { loanType, purpose, loanAmount, units, state, creditScore, contactInfo } = req.body;

    // Validate required fields
    if (!contactInfo || !contactInfo.fullName || !contactInfo.email || !contactInfo.phone) {
        return res.status(400).json({ message: 'Missing contact information' });
    }

    // Configure transporter
    // These environment variables must be set in Vercel
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email app password
        }
    });

    const mailOptions = {
        from: `"Across America Mortgage Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Loan Inquiry: ${contactInfo.fullName}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #0f172a; color: white; padding: 24px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">New Loan Inquiry</h1>
                    <p style="margin: 8px 0 0; opacity: 0.8;">Across America Mortgage</p>
                </div>
                <div style="padding: 24px; background-color: white;">
                    <h2 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 0;">Contact Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; width: 140px;">Full Name:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${contactInfo.fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Email:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${contactInfo.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${contactInfo.phone}</td>
                        </tr>
                    </table>

                    <h2 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 32px;">Loan Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; width: 140px;">Loan Type:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${loanType || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Purpose:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${purpose || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Loan Amount:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${loanAmount || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Units:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${units || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Property State:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${state || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;">Credit Score:</td>
                            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${creditScore || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
                <div style="background-color: #f8fafc; padding: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
                    This inquiry was submitted via the Across America Mortgage onboarding form.
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Submission successful' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', details: error.message });
    }
}
