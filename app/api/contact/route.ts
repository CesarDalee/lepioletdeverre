import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const entreprise = String(body.entreprise || "").trim()
    const email = String(body.email || "").trim()
    const telephone = String(body.telephone || "").trim()

    if (!entreprise || !email || !telephone) {
      return NextResponse.json(
        { error: "Champs requis manquants." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      )
    }

    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY manquante." },
        { status: 500 }
      )
    }

    if (!to) {
      return NextResponse.json(
        { error: "Adresse de réception non configurée." },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouvelle demande entreprise — Le Piolet de Verre`,
      text: `
Nouvelle demande entreprise :

Entreprise : ${entreprise}
Email : ${email}
Téléphone : ${telephone}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Nouvelle demande entreprise — Le Piolet de Verre</h2>
          <p><strong>Entreprise :</strong> ${entreprise}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${telephone}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de l’envoi du message.",
      },
      { status: 500 }
    )
  }
}
