import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import "@designcodeio/threeui/style.css";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portal Kawasan Tanpa Rokok (KTR) — Kabupaten Karawang',
  description: 'Portal Edukasi Bahaya Merokok, Regulasi Hukum KTR, dan Layanan Pengaduan Pelanggaran Warga Bebas Asap Rokok.',
  icons: {
    icon: '/logo-ktr.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#141a12] text-white selection:bg-[#729c48]/30 font-sans">
        {children}
      </body>
    </html>
  );
}
