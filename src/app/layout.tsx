import type { Metadata } from 'next';
import { inter } from './ui/fonts';
import Navbar from './ui/navbar/Navbar';

import './ui/globals.css';
import '@mdxeditor/editor/style.css';

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
