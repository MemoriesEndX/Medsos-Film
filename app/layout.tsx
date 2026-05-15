import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cineku — Ruang Karya Film Indonesia',
  description: 'Platform digital untuk showcase, discovery, portfolio, dan kolaborasi filmmaker Indonesia.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
