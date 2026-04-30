import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from =
      process.env.CONTACT_FROM_EMAIL || "Le Piolet de Verre <contact@embraz.fr>"

    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY manquante." }, { status: 500 })
    }

    if (!to) {
      return NextResponse.json({ error: "CONTACT_TO_EMAIL manquante." }, { status: 500 })
    }

    const body = await request.json()

    const entreprise = String(body.entreprise || "").trim()
    const email = String(body.email || "").trim()
    const telephone = String(body.telephone || "").trim()

    if (!entreprise || !email || !telephone) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 })
    }

    const resend = new Resend(apiKey)

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "Nouvelle demande entreprise — Le Piolet de Verre",
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

    if (result.error) {
      console.error("Resend error:", result.error)
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API error:", error)

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
