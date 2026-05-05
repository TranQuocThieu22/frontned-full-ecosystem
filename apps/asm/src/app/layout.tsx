// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import Provider from '@/providers/Provider';
import '@mantine/charts/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import 'mantine-react-table/styles.css';
import "./globals.css";

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};
registerAllModules();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
} 