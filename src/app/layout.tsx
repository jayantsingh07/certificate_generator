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
  title: "Image",
  description: "Image"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${noto.variable} ${poppins.variable} ${roboto.variable} ${cinzel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}