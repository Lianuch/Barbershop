import nodemailer, { Transporter } from "nodemailer";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

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
  async sendRecordInformation(to: string, date: Date) {
    const formattedDate = format(date, "dd MMMM yyyy 'о' HH:mm", { locale: uk });
    await this.transporter.sendMail({
      from: `"Bliss Barbershop" <${process.env.SMTP_USER}>`,
      to,
      subject: `Інформація про запис`,
      html: `
        <div>
          <h1>Добрий день! Ви записані на: ${formattedDate}</h1>
        </div>
      `,
    });
  }
}

export default new MailService();
