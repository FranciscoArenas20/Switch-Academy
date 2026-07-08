import resend from "./resend";

const FROM = "onboarding@resend.dev";

const confirmationContent: Record<
  string,
  { subject: string; title: string; body: string; note: string; farewell: string }
> = {
  en: {
    subject: "We received your message 🎉",
    title: "Thanks for your message!",
    body: "Alex has received your information and will get back to you within 24 hours.",
    note: "If you have any urgent questions, feel free to reach out via WhatsApp.",
    farewell: "Best regards,\nThe Switch Academy Team",
  },
  fr: {
    subject: "Nous avons reçu votre message 🎉",
    title: "Merci pour votre message !",
    body: "Alex a reçu vos informations et vous répondra dans les 24 heures.",
    note: "Si vous avez des questions urgentes, n'hésitez pas à contacter via WhatsApp.",
    farewell: "Cordialement,\nL'équipe Switch Academy",
  },
  es: {
    subject: "Recibimos tu mensaje 🎉",
    title: "¡Gracias por tu mensaje!",
    body: "Alex ha recibido tu información y te contactará en menos de 24 horas.",
    note: "Si tienes alguna pregunta urgente, no dudes en contactarnos por WhatsApp.",
    farewell: "Saludos cordiales,\nEl equipo de Switch Academy",
  },
};

function wrapHTML(bodyHTML: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background-color:#F5F2EC;font-family:'DM Sans',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F2EC;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:40px 32px;">
                ${bodyHTML}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;text-align:center;font-size:12px;color:#9999aa;">
                Switch Academy &mdash; Learn languages with Alex
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ownerHTML(data: {
  nombre: string;
  email: string;
  telefono: string | null;
  idioma: string;
  mensaje: string | null;
}) {
  return wrapHTML(`
    <h1 style="font-family:Syne,Arial,sans-serif;font-size:22px;font-weight:700;margin:0 0 8px 0;color:#111827;">
      New lead 🎯
    </h1>
    <p style="font-size:14px;color:#6b7280;margin:0 0 24px 0;">
      A new lead has submitted the form.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;font-size:13px;font-weight:600;color:#374151;width:100px;vertical-align:top;">
          Name
        </td>
        <td style="padding:8px 0;font-size:13px;color:#111827;">
          ${data.nombre}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;font-weight:600;color:#374151;width:100px;vertical-align:top;">
          Email
        </td>
        <td style="padding:8px 0;font-size:13px;color:#111827;">
          <a href="mailto:${data.email}" style="color:#2563EB;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;font-weight:600;color:#374151;width:100px;vertical-align:top;">
          Phone
        </td>
        <td style="padding:8px 0;font-size:13px;color:#111827;">
          ${data.telefono || "—"}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;font-weight:600;color:#374151;width:100px;vertical-align:top;">
          Language
        </td>
        <td style="padding:8px 0;font-size:13px;color:#111827;">
          ${data.idioma}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;font-weight:600;color:#374151;width:100px;vertical-align:top;">
          Message
        </td>
        <td style="padding:8px 0;font-size:13px;color:#111827;">
          ${data.mensaje || "—"}
        </td>
      </tr>
    </table>
  `);
}

function confirmationHTML(name: string, lang: string) {
  const c = confirmationContent[lang] || confirmationContent.en;
  return wrapHTML(`
    <h1 style="font-family:Syne,Arial,sans-serif;font-size:22px;font-weight:700;margin:0 0 8px 0;color:#111827;">
      ${c.title}
    </h1>
    <p style="font-size:14px;color:#6b7280;margin:0 0 16px 0;">
      ${c.body}
    </p>
    <p style="font-size:14px;color:#6b7280;margin:0 0 24px 0;">
      ${c.note}
    </p>
    <p style="font-size:14px;color:#6b7280;margin:0 0 0 0;white-space:pre-line;">
      ${c.farewell}
    </p>
  `);
}

export async function sendOwnerNotification(data: {
  nombre: string;
  email: string;
  telefono: string | null;
  idioma: string;
  mensaje: string | null;
}) {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) return;

  await resend.emails.send({
    from: `${FROM}`,
    to: ownerEmail,
    subject: `Nuevo lead: ${data.nombre} — ${data.idioma}`,
    html: ownerHTML(data),
  });
}

export async function sendLeadConfirmation(
  name: string,
  toEmail: string,
  lang: string
) {
  const c = confirmationContent[lang] || confirmationContent.en;
  await resend.emails.send({
    from: `${FROM}`,
    to: toEmail,
    subject: c.subject,
    html: confirmationHTML(name, lang),
  });
}
