import nodemailer, { Transporter } from "nodemailer";

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), 
      secure: false,
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: `"Bliss Barbershop" <${process.env.SMTP_USER}>`,
      to,
      subject: `Activation account on ${process.env.API_URL}`,
      html: `
        <div>
          <h1>Activate your account</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
