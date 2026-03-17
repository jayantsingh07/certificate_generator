import type { Metadata } from "next"
import { Noto_Sans, Poppins, Roboto, Cinzel } from "next/font/google"
import "./globals.css"

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
})

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto"
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins"
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto"
})

export const metadata: Metadata = {
  title: "Certificate Generator - Professional Certificates Made Easy",
  description: "Create beautiful, professional certificates in seconds. Upload your Excel file, customize templates, and generate certificates instantly.",
  keywords: "certificate generator, certificates, professional, templates",
  authors: [{ name: "Certificate Generator" }],
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${noto.variable} ${poppins.variable} ${roboto.variable} ${cinzel.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}