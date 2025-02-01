import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SessionWrapper from './ui/session-wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dark = true
  return (
    <html lang="en" className={dark ? 'dark' : undefined}>
      <body className={`${inter.className} antialiased`}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
