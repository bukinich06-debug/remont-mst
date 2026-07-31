import type { Metadata } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'МастерСервис — ремонт стиральных машин и холодильников в Мстиславле',
  description:
    'Ремонт стиральных машин и холодильников в Мстиславле и районе. Выезд мастера на дом, честная диагностика, гарантия 6 месяцев.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${nunito.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  )
}
