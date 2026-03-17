import type { Metadata } from "next"
import { Noto_Sans, Poppins, Roboto, Cinzel, Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

// Modern display font for headings
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
})

// Modern sans-serif for body and UI
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

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
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
        className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${roboto.variable} ${cinzel.variable} ${noto.variable} antialiased overflow-x-hidden font-[Noto_Sans]`}
      >
        <style>{`
          :root {
            --font-display: ${playfair.style.fontFamily};
            --font-body: ${inter.style.fontFamily};
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}