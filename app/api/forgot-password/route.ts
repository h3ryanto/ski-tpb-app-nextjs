
import { EmailTemplate } from '@/components/ui/app-email-forgot-paasword-template';
import { forgotPassword } from '@/lib/database/neon_postgresSql/authentication';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(Request: Request) {
  const body = await Request.json();
  const email = body?.email ?? null;

  const getUser = await forgotPassword(email);

  if (getUser.status === true) {
    console.log(getUser, 'getUser')
    const { error } = await resend.emails.send({
      from: "no_reply <onboarding@resend.dev>",
      to: [`${getUser.email}`],
      subject: 'Reset Password',
      react: EmailTemplate({ name: `${getUser.name}` }),
    });

    if (error) {
      return Response.json(
        {
          error
        },
        {
          status: 400, statusText: 'OK',
          headers: { 'content-type': 'application/json' }
        }
      )
    }


    return Response.json({ message: "Tautan berhasil dikirim ke email Anda. Silahkan cek email Anda untuk mereset password." }, { status: 200, statusText: 'OK' });
  } else {
    return Response.json({ message: "Silahkan periksa kembali email yang anda masukan apakah sudah sesuai?" }, { status: 400, statusText: 'Bad Request' });

  }






};
