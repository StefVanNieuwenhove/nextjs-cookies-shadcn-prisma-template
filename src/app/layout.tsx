import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar, ScreenSize } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Nextjs Cookies Shadcn Prisma Template',
  description:
    'Template for Nextjs, Cookies from next-cookies, Shadcn UI, Prisma, docker-compose',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className='container mx-auto min-w-full min-h-screen max-h-full flex flex-col items-center'>
          {children}
        </main>
        <footer>
          <p>Footer</p>
        </footer>
        <Toaster richColors theme='light' duration={4000} expand closeButton />
        <ScreenSize />
      </body>
    </html>
  );
}
