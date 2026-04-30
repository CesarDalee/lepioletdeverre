import type { Metadata } from "next"
import { Epilogue, Inter, Saira_Condensed } from "next/font/google"
import "./globals.css"

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-saira-condensed",
})

export const metadata: Metadata = {
  title: "Le Piolet de Verre",
  description: "Le projet Valkyrie",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${epilogue.variable} ${inter.variable} ${saira.variable}`}>
      <body>{children}</body>
    </html>
  )
}
