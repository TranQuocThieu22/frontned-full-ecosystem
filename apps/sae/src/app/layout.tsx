// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@aq-fe/core-ui/shared/styles/global.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import "./globals.css";

import Provider from '@/providers/Provider';
import { ColorSchemeScript } from '@mantine/core';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  return (
    <html suppressHydrationWarning >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
} 