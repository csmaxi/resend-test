import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const surname = formData.get('surname') as string;
    const mensaje = formData.get('mensaje') as string;
    const email = formData.get('email') as string;
    const picture = formData.get('picture') as File;

    const attachments = picture
      ? [
        {
          content: Buffer.from(await picture.arrayBuffer()).toString('base64'),
          filename: picture.name,
        },
      ]
      : [];

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['csmaxinro@gmail.com'],
      subject: 'Mensaje de EventosApp',
      react: EmailTemplate({ firstName, surname, mensaje, picture, email }),
      text: "EventosApp",
      attachments,
    });

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    // Comprobación de tipo para 'error'
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } else {
      // Manejar otros tipos de 'error' aquí si es necesario
      return new Response(JSON.stringify({ error: 'Error desconocido' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
}
