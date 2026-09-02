import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {title:'TPEL — Tyndall Power Electronics Laboratory',description:'Power electronics research led by Dr Yi Dou at Tyndall National Institute, Cork.'};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
